import jwt from "jsonwebtoken";
import { supabaseAdmin } from "../_supabase.js";

function requireAdmin(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) throw new Error("Missing token");

  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("Missing ADMIN_JWT_SECRET");
  jwt.verify(token, secret);
}

function clampInt(v, min, max, def) {
  const n = parseInt(String(v ?? ""), 10);
  if (!Number.isFinite(n)) return def;
  return Math.min(max, Math.max(min, n));
}

function countBy(list, getKey) {
  const map = new Map();
  for (const item of list) {
    const k = getKey(item);
    if (!k) continue;
    map.set(k, (map.get(k) || 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({ key, count }));
}

async function fetchAllInWindow(sb, table, columns, fromIso, toIso, limit = 10000) {
  // Early-stage friendly: fetch up to `limit` rows and compute in JS
  const { data, error } = await sb
    .from(table)
    .select(columns)
    .gte("ts", fromIso)
    .lte("ts", toIso)
    .order("ts", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

export default async function handler(req, res) {
  try {
    requireAdmin(req);

    const days = clampInt(req.query.days, 1, 90, 7);
    const to = new Date();
    const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);

    const sb = supabaseAdmin();

    const fromIso = from.toISOString();
    const toIso = to.toISOString();

    const pageviews = await fetchAllInWindow(
      sb,
      "pageviews",
      "visitor_id,path,ts,duration_ms,scroll_max",
      fromIso,
      toIso,
      15000
    );

    const events = await fetchAllInWindow(
      sb,
      "events",
      "visitor_id,name,path,ts",
      fromIso,
      toIso,
      15000
    );

    const uniqueVisitorsSet = new Set(pageviews.map((p) => p.visitor_id).filter(Boolean));
    const uniqueVisitors = uniqueVisitorsSet.size;

    // Returning visitors = sessions_count > 1 in visitors table
    let returning = 0;
    const visitorIds = Array.from(uniqueVisitorsSet);
    if (visitorIds.length) {
      // chunk to avoid URL/query limits
      const chunkSize = 150;
      for (let i = 0; i < visitorIds.length; i += chunkSize) {
        const chunk = visitorIds.slice(i, i + chunkSize);
        const { data, error } = await sb
          .from("visitors")
          .select("visitor_id,sessions_count")
          .in("visitor_id", chunk);
        if (error) throw error;
        for (const r of data || []) {
          if ((r.sessions_count || 0) > 1) returning += 1;
        }
      }
    }

    const durations = pageviews.map((p) => Number(p.duration_ms || 0)).filter((v) => v > 0);
    const avgTimeSeconds = durations.length
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length / 1000)
      : 0;

    const scrolls = pageviews.map((p) => Number(p.scroll_max || 0)).filter((v) => v > 0);
    const avgScroll = scrolls.length
      ? Math.round(scrolls.reduce((a, b) => a + b, 0) / scrolls.length)
      : 0;

    const topPages = countBy(pageviews, (p) => p.path).slice(0, 20);
    const topEvents = countBy(events, (e) => e.name).slice(0, 20);

    const conversions = events.filter((e) => e.name === "lead_submit_success").length;
    const conversionRate = uniqueVisitors ? conversions / uniqueVisitors : 0;

    return res.json({
      ok: true,
      window: { from: fromIso, to: toIso, days },
      summary: {
        pageviews: pageviews.length,
        unique_visitors: uniqueVisitors,
        returning_visitors: returning,
        avg_time_seconds: avgTimeSeconds,
        avg_scroll_percent: avgScroll,
        events: events.length,
        conversions,
        conversion_rate: conversionRate,
      },
      top_pages: topPages,
      top_events: topEvents,
    });
  } catch (e) {
    return res.status(401).json({ ok: false, message: e?.message || "Unauthorized" });
  }
}

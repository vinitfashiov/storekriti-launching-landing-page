import { supabaseAdmin } from "./_supabase.js";

function safeStr(v, max = 300) {
  const s = String(v ?? "").trim();
  if (!s) return null;
  return s.length > max ? s.slice(0, max) : s;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

    const type = safeStr(body.type, 50);
    const visitor_id = safeStr(body.visitor_id, 80);
    const session_id = safeStr(body.session_id, 80);
    const path = safeStr(body.path, 300) || "/";
    const title = safeStr(body.title, 200);
    const referrer = safeStr(body.referrer, 300);
    const user_agent = safeStr(req.headers["user-agent"], 300);

    if (!visitor_id || !session_id) {
      return res.status(400).json({ ok: false, message: "missing visitor_id/session_id" });
    }

    const sb = supabaseAdmin();

    // Upsert visitor (anonymous)
    await sb
      .from("visitors")
      .upsert({ visitor_id, last_seen: new Date().toISOString() }, { onConflict: "visitor_id" });

    if (type === "session_start") {
      // increment sessions_count (simple)
      const { data: v } = await sb
        .from("visitors")
        .select("sessions_count")
        .eq("visitor_id", visitor_id)
        .maybeSingle();

      const sessions_count = (v?.sessions_count ?? 0) + 1;
      await sb.from("visitors").update({ sessions_count }).eq("visitor_id", visitor_id);

      const landing_path = safeStr(body.landing_path, 300) || path;
      const payload = {
        session_id,
        visitor_id,
        landing_path,
        referrer,
        user_agent,
        country: safeStr(body.country, 100),
        city: safeStr(body.city, 100),
      };

      const { error } = await sb.from("sessions").upsert(payload, { onConflict: "session_id" });
      if (error) throw error;
      return res.json({ ok: true });
    }

    if (type === "pageview") {
      const payload = { session_id, visitor_id, path, title, referrer };
      const { error } = await sb.from("pageviews").insert([payload]);
      if (error) throw error;
      return res.json({ ok: true });
    }

    if (type === "pageview_end") {
      const duration_ms = Number(body.duration_ms || 0) || null;
      const scroll_max = Number(body.scroll_max || 0) || null;

      // Update latest pageview for this session+path
      const { data, error } = await sb
        .from("pageviews")
        .select("id")
        .eq("session_id", session_id)
        .eq("path", path)
        .order("ts", { ascending: false })
        .limit(1);

      if (error) throw error;

      const id = data?.[0]?.id;
      if (id) {
        const { error: uerr } = await sb
          .from("pageviews")
          .update({ duration_ms, scroll_max })
          .eq("id", id);
        if (uerr) throw uerr;
      }

      return res.json({ ok: true });
    }

    if (type === "event") {
      const name = safeStr(body.name, 80);
      if (!name) return res.status(400).json({ ok: false, message: "missing event name" });

      const props = body.props && typeof body.props === "object" ? body.props : null;
      const payload = { session_id, visitor_id, name, path, props };
      const { error } = await sb.from("events").insert([payload]);
      if (error) throw error;
      return res.json({ ok: true });
    }

    return res.status(400).json({ ok: false, message: "invalid type" });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e?.message || "Server error" });
  }
}

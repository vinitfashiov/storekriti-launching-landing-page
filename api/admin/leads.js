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

export default async function handler(req, res) {
  try {
    requireAdmin(req);

    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.min(100, Math.max(10, parseInt(req.query.limit || "20", 10)));
    const q = String(req.query.q || "").trim();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const sb = supabaseAdmin();

    let query = sb
      .from("leads")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (q) {
      // basic search
      query = query.or(
        `name.ilike.%${q}%,whatsapp.ilike.%${q}%,email.ilike.%${q}%,business.ilike.%${q}%,message.ilike.%${q}%`
      );
    }

    const { data, count, error } = await query;
    if (error) throw error;

    return res.json({
      ok: true,
      page,
      limit,
      total: count || 0,
      pages: Math.ceil((count || 0) / limit),
      rows: data || [],
    });
  } catch (e) {
    return res.status(401).json({ ok: false, message: e?.message || "Unauthorized" });
  }
}

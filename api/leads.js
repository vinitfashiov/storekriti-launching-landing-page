import { supabaseAdmin } from "./_supabase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const name = String(body.name || "").trim();
    const whatsapp = String(body.whatsapp || "").trim();
    const email = String(body.email || "").trim() || null;
    const business = String(body.business || "").trim() || null;
    const message = String(body.message || "").trim() || null;
    const source = String(body.source || "landing").trim();

    if (!name || !whatsapp) return res.status(400).json({ ok: false, message: "Name & WhatsApp are required" });

    const sb = supabaseAdmin();
    const { error } = await sb.from("leads").insert([{ name, whatsapp, email, business, message, source }]);
    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e?.message || "Server error" });
  }
}

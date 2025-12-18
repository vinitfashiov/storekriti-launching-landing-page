import { supabaseAdmin } from "./_supabase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    // required
    const name = String(body.name || "").trim();
    const whatsapp = String(body.whatsapp || "").trim();

    // ✅ NEW (your landing + popup forms)
    const business_type = String(body.business_type || "").trim() || null;
    const budget_range = String(body.budget_range || "").trim() || null;
    const start_timeline = String(body.start_timeline || "").trim() || null;
    const motivation = String(body.motivation || "").trim() || null;

    // ✅ BACKWARD COMPAT (old fields if you ever use them)
    const email = String(body.email || "").trim() || null;
    const business = String(body.business || "").trim() || null;
    const message = String(body.message || "").trim() || null;

    const source = String(body.source || "landing").trim();

    if (!name || !whatsapp) {
      return res
        .status(400)
        .json({ ok: false, message: "Name & WhatsApp are required" });
    }

    const sb = supabaseAdmin();

    // ✅ Insert (includes new fields)
    const { error } = await sb.from("leads").insert([
      {
        name,
        whatsapp,
        business_type,
        budget_range,
        start_timeline,
        motivation,
        source,

        // keep old ones too (no harm)
        email,
        business,
        message,
      },
    ]);

    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res
      .status(500)
      .json({ ok: false, message: e?.message || "Server error" });
  }
}

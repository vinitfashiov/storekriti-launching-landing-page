import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  const password = String(body.password || "");

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_JWT_SECRET) {
    return res.status(500).json({ ok: false, message: "Admin env missing" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, message: "Invalid password" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.ADMIN_JWT_SECRET, { expiresIn: "7d" });
  return res.json({ ok: true, token });
}

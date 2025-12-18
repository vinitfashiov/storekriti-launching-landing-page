import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// If you deploy frontend + backend on different domains, set CORS_ORIGIN to your frontend URL.
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: "200kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

const LeadSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  whatsapp: z
    .string()
    .trim()
    .min(6, "WhatsApp number is required")
    .max(20, "WhatsApp number is too long"),
  businessType: z.string().trim().min(2, "Business type is required"),
  budget: z.string().trim().min(1, "Budget is required"),
  timeline: z.string().trim().min(1, "Timeline is required"),
  reason: z.string().trim().min(5, "Reason is required"),
});

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

app.post("/api/leads", (req, res) => {
  const parsed = LeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.issues?.[0]?.message || "Invalid form data",
      issues: parsed.error.issues,
    });
  }

  const lead = {
    id: cryptoRandomId(),
    ...parsed.data,
    createdAt: new Date().toISOString(),
    ip: req.headers["x-forwarded-for"]?.toString()?.split(",")[0]?.trim() || req.socket.remoteAddress || null,
    userAgent: req.headers["user-agent"] || null,
  };

  const dataDir = path.join(__dirname, "data");
  ensureDir(dataDir);

  // JSON Lines file (one JSON object per line) — easy and robust for MVP.
  const file = path.join(dataDir, "leads.jsonl");
  fs.appendFileSync(file, JSON.stringify(lead) + "\n", "utf8");

  return res.status(201).json({ ok: true, id: lead.id });
});

const PORT = Number(process.env.PORT || 5050);
app.listen(PORT, () => {
  console.log(`✅ Leads API running on http://localhost:${PORT}`);
});

function cryptoRandomId() {
  // No extra deps: use built-in crypto.
  return crypto.randomBytes(8).toString("hex");
}

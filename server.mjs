import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 8787);
const root = path.dirname(fileURLToPath(import.meta.url));

app.disable("x-powered-by");
app.use(express.json({ limit: "24kb" }));

const formDefinitions = {
  contact: {
    recipientEnv: "CONTACT_FORM_EMAIL",
    subject: "New website contact enquiry",
    required: ["name", "email", "interest", "budget", "message"],
    labels: { name: "Name", email: "Email", interest: "Property interest", budget: "Budget", message: "Message" },
  },
  realtor: {
    recipientEnv: "REALTOR_FORM_EMAIL",
    subject: "New realtor application",
    required: ["name", "email", "phone", "realEstateExperience", "location", "message"],
    labels: { name: "Full name", email: "Email", phone: "Phone", realEstateExperience: "Previous real-estate experience", location: "Location", message: "Reason for applying" },
  },
};

const attempts = new Map();
const rateLimit = (request, response, next) => {
  const key = request.ip || request.socket.remoteAddress || "unknown";
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((time) => now - time < 15 * 60_000);
  if (recent.length >= 5) return response.status(429).json({ message: "Too many submissions. Please try again later." });
  recent.push(now);
  attempts.set(key, recent);
  next();
};

const clean = (value) => String(value ?? "").trim().slice(0, 5000);
const escapeHtml = (value) => clean(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const createTransport = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass || !process.env.SMTP_FROM) throw new Error("SMTP delivery is not configured.");
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
};

app.post("/api/forms/:kind", rateLimit, async (request, response) => {
  const definition = formDefinitions[request.params.kind];
  if (!definition) return response.status(404).json({ message: "Unknown form." });
  const origin = request.get("origin");
  if (process.env.APP_ORIGIN && origin && origin !== process.env.APP_ORIGIN) return response.status(403).json({ message: "This submission origin is not allowed." });
  if (clean(request.body?.website)) return response.status(200).json({ ok: true });

  const values = Object.fromEntries(Object.keys(definition.labels).map((key) => [key, clean(request.body?.[key])]));
  if (definition.required.some((key) => !values[key])) return response.status(400).json({ message: "Please complete every required field." });
  if (!validEmail(values.email) || values.email.length > 254) return response.status(400).json({ message: "Please enter a valid email address." });

  const recipient = process.env[definition.recipientEnv];
  if (!recipient) return response.status(503).json({ message: "Email delivery has not been configured yet." });
  const rows = Object.entries(definition.labels).map(([key, label]) => `<tr><th style="padding:8px;text-align:left;vertical-align:top">${label}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(values[key])}</td></tr>`).join("");

  try {
    await createTransport().sendMail({
      from: process.env.SMTP_FROM,
      to: recipient,
      replyTo: values.email,
      subject: definition.subject,
      text: Object.entries(definition.labels).map(([key, label]) => `${label}: ${values[key]}`).join("\n\n"),
      html: `<h2>${definition.subject}</h2><table style="border-collapse:collapse">${rows}</table>`,
    });
    response.status(200).json({ ok: true });
  } catch (error) {
    console.error("SMTP form delivery failed", error);
    response.status(502).json({ message: "Your message could not be delivered. Please try again later." });
  }
});

app.use(express.static(path.join(root, "dist")));
app.get("/{*path}", (_request, response) => response.sendFile(path.join(root, "dist", "index.html")));
app.listen(port, () => console.log(`Website server listening on http://localhost:${port}`));

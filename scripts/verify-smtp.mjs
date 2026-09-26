import nodemailer from "nodemailer";

const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) throw new Error(`Missing SMTP variables: ${missing.join(", ")}`);

if (process.env.SMTP_HOST === "smtp.resend.com") {
  if (process.env.SMTP_USER !== "resend") throw new Error('Resend SMTP requires SMTP_USER="resend".');
  if (!process.env.SMTP_PASSWORD.startsWith("re_")) throw new Error("Resend SMTP_PASSWORD should be a Resend API key beginning with re_.");
}

const port = Number(process.env.SMTP_PORT);
const secure = process.env.SMTP_SECURE === "true";
if ((port === 465 && !secure) || (port === 587 && secure)) {
  throw new Error(`SMTP_PORT=${port} does not match SMTP_SECURE=${secure}. Use 465/true or 587/false.`);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

process.stdout.write("Checking SMTP connection and authentication...\n");
await transporter.verify();
process.stdout.write("SMTP connection and authentication succeeded. This does not verify that SMTP_FROM is an allowed sender.\n");

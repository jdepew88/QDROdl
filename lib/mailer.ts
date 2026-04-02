import nodemailer from "nodemailer";

export function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    "http://127.0.0.1:3000"
  ).replace(/\/$/, "");
}

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

export async function sendVerificationEmail(opts: { to: string; token: string }) {
  if (!smtpConfigured()) {
    return { sent: false, reason: "SMTP not configured" as const };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_PORT) === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const verifyUrl = `${getAppUrl()}/verify-email?token=${encodeURIComponent(opts.token)}`;

  const fromForSending = process.env.SMTP_USER;
  const replyTo = process.env.MAIL_FROM;

  await transporter.sendMail({
    // Some SMTP providers reject "From" values that aren't exactly the authenticated sender.
    // Using SMTP_USER for `from` avoids relay/send failures (e.g. 553 not allowed to relay).
    from: fromForSending,
    to: opts.to,
    subject: "Thanks for registering - verify your email",
    text: `Thanks for registering with QDROdl.\n\nPlease verify your email by clicking this link:\n${verifyUrl}\n\nIf you did not request this, you can ignore this email.`,
    html: `
      <p>Thanks for registering with <strong>QDROdl</strong>.</p>
      <p>Please verify your email by clicking the link below:</p>
      <p><a href="${verifyUrl}">Verify email address</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
    ...(replyTo ? { replyTo } : {}),
  });

  return { sent: true as const };
}

export async function sendStaffNotificationEmail(opts: {
  to: string[];
  cc?: string[];
  subject: string;
  text: string;
  html?: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const recipients = opts.to.map((e) => e.trim()).filter(Boolean);
  if (recipients.length === 0) {
    return { sent: false, reason: "No recipients" };
  }
  if (!smtpConfigured()) {
    return { sent: false, reason: "SMTP not configured" };
  }

  const fromForSending = process.env.SMTP_USER;
  const replyTo = process.env.MAIL_FROM;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_PORT) === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const ccList = (opts.cc || []).map((e) => e.trim()).filter(Boolean);

  await transporter.sendMail({
    // Use SMTP_USER as the actual authenticated sender to avoid "not allowed to relay".
    from: fromForSending,
    to: recipients.join(", "),
    ...(ccList.length ? { cc: ccList.join(", ") } : {}),
    subject: opts.subject,
    text: opts.text,
    html: opts.html ?? opts.text.replace(/\n/g, "<br/>"),
    ...(replyTo ? { replyTo } : {}),
  });

  return { sent: true };
}


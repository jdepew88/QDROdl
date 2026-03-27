import crypto from "crypto";

const AUTH_COOKIE = "qdrodl_session";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function getAuthCookieName() {
  return AUTH_COOKIE;
}

export function getLoginConfig() {
  const email = process.env.LOGIN_EMAIL || "admin@qdrodl.app";
  const password = process.env.LOGIN_PASSWORD || "change-me";
  return { email, password };
}

export function getSecret() {
  return process.env.AUTH_SECRET || "dev-only-secret";
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateEnvCredentials(email: string, password: string) {
  const cfg = getLoginConfig();
  const normalizedEmail = normalizeEmail(email);
  return (
    safeEqual(normalizedEmail, normalizeEmail(cfg.email)) &&
    safeEqual(password, cfg.password)
  );
}

export function signSession(email: string) {
  const payload = JSON.stringify({
    email: normalizeEmail(email),
    iat: Date.now(),
  });
  const data = Buffer.from(payload).toString("base64url");
  const sig = sha256(`${data}.${getSecret()}`);
  return `${data}.${sig}`;
}

export function verifySession(token: string | undefined | null) {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = sha256(`${data}.${getSecret()}`);
  if (!safeEqual(sig, expected)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (!parsed?.email) return null;
    return parsed as { email: string; iat: number };
  } catch {
    return null;
  }
}

export function hashVerificationToken(token: string) {
  return sha256(`${token}.${getSecret()}`);
}


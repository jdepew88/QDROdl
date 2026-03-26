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

export function validateCredentials(email: string, password: string) {
  const cfg = getLoginConfig();
  return (
    safeEqual(email.trim().toLowerCase(), cfg.email.trim().toLowerCase()) &&
    safeEqual(password, cfg.password)
  );
}

export function signSession(email: string) {
  const secret = process.env.AUTH_SECRET || "dev-only-secret";
  const payload = JSON.stringify({
    email: email.trim().toLowerCase(),
    iat: Date.now(),
  });
  const data = Buffer.from(payload).toString("base64url");
  const sig = sha256(`${data}.${secret}`);
  return `${data}.${sig}`;
}

export function verifySession(token: string | undefined | null) {
  if (!token) return null;
  const secret = process.env.AUTH_SECRET || "dev-only-secret";
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = sha256(`${data}.${secret}`);
  if (!safeEqual(sig, expected)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (!parsed?.email) return null;
    return parsed as { email: string; iat: number };
  } catch {
    return null;
  }
}


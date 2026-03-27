import crypto from "crypto";

const AUTH_COOKIE = "qdrodl_session";
const ACCOUNT_COOKIE = "qdrodl_account";

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

export function getAccountCookieName() {
  return ACCOUNT_COOKIE;
}

export function getLoginConfig() {
  const email = process.env.LOGIN_EMAIL || "admin@qdrodl.app";
  const password = process.env.LOGIN_PASSWORD || "change-me";
  return { email, password };
}

function getSecret() {
  return process.env.AUTH_SECRET || "dev-only-secret";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string) {
  return sha256(`${password}.${getSecret()}`);
}

export function signAccount(email: string, password: string) {
  const payload = JSON.stringify({
    email: normalizeEmail(email),
    passwordHash: hashPassword(password),
    iat: Date.now(),
  });
  const data = Buffer.from(payload).toString("base64url");
  const sig = sha256(`${data}.${getSecret()}`);
  return `${data}.${sig}`;
}

export function verifyAccount(token: string | undefined | null) {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = sha256(`${data}.${getSecret()}`);
  if (!safeEqual(sig, expected)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (!parsed?.email || !parsed?.passwordHash) return null;
    return parsed as { email: string; passwordHash: string; iat: number };
  } catch {
    return null;
  }
}

export function validateCredentials(
  email: string,
  password: string,
  accountToken?: string | null,
) {
  const cfg = getLoginConfig();
  const normalizedEmail = normalizeEmail(email);
  const envMatch =
    safeEqual(normalizedEmail, normalizeEmail(cfg.email)) &&
    safeEqual(password, cfg.password);
  if (envMatch) return true;

  const account = verifyAccount(accountToken || null);
  if (!account) return false;
  return (
    safeEqual(normalizedEmail, normalizeEmail(account.email)) &&
    safeEqual(hashPassword(password), account.passwordHash)
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


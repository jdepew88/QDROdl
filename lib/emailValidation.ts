const OBVIOUSLY_FAKE_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "fake.com",
  "mailinator.com",
  "tempmail.com",
]);

export function isLikelyValidEmail(input: string): boolean {
  const email = String(input || "").trim().toLowerCase();
  if (!email) return false;
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!basic.test(email)) return false;
  const [, domain = ""] = email.split("@");
  if (!domain || OBVIOUSLY_FAKE_DOMAINS.has(domain)) return false;
  return true;
}


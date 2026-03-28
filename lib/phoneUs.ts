/** Keep only ASCII digits. */
export function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

/** Exactly 10 digits for US numbers, or null. */
export function normalizeUsPhone10Digits(input: string): string | null {
  const d = digitsOnly(input);
  if (d.length !== 10) return null;
  return d;
}

/** Display as (000) 000-1234 when 10 digits; partial input shows progressive mask. */
export function formatUsPhoneInput(digitsSoFar: string): string {
  const d = digitsOnly(digitsSoFar).slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** Canonical storage format for a valid 10-digit string. */
export function formatUsPhoneStored(tenDigits: string): string {
  const d = digitsOnly(tenDigits).slice(0, 10);
  if (d.length !== 10) return "";
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

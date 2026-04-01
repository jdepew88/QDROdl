/** US ZIP: 12345 or 12345-6789 */
export function isValidUsPostalCode(input: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(String(input || "").trim());
}

export function normalizeUsPostalCode(input: string): string {
  return String(input || "").trim();
}

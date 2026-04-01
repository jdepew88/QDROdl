import type { Party } from "@prisma/client";

type PartyAddr = Pick<
  Party,
  "address1" | "address2" | "city" | "state" | "postalCode"
>;

/** True when structured city / state / ZIP fields are in use. */
export function partyHasStructuredMailing(p: PartyAddr): boolean {
  return Boolean(
    (p.city || "").trim() ||
      (p.state || "").trim() ||
      (p.postalCode || "").trim(),
  );
}

/**
 * First address line for captions / merge: street (+ apt when structured mailing exists).
 * Legacy rows: only `address1` + `address2` as city line → street is `address1` only.
 */
export function partyMergeAddressLine1(p: PartyAddr): string {
  const street = (p.address1 || "").trim();
  if (!partyHasStructuredMailing(p)) return street;
  const apt = (p.address2 || "").trim();
  return [street, apt].filter(Boolean).join(", ");
}

/**
 * Second line: "City, ST ZIP" from structured fields, else legacy `address2` (e.g. full city line).
 */
export function partyMergeAddressLine2(p: PartyAddr): string {
  if (!partyHasStructuredMailing(p)) {
    return (p.address2 || "").trim();
  }
  const city = (p.city || "").trim();
  const state = (p.state || "").trim();
  const zip = (p.postalCode || "").trim();
  const tail = [state, zip].filter(Boolean).join(" ").trim();
  return [city, tail].filter(Boolean).join(", ");
}

/**
 * If `address2` was historically a single "City, ST ZIP" line, split for editing.
 * Returns null when the pattern does not match.
 */
export function tryParseLegacyCityStateZip(
  address2: string | null | undefined,
): { city: string; state: string; postalCode: string } | null {
  const s = (address2 || "").trim();
  if (!s) return null;
  const m = s.match(/^(.+?)\s*,\s*([A-Za-z]{2})\s+(\d{5}(?:-\d{4})?)\s*$/);
  if (!m) return null;
  return {
    city: m[1].trim(),
    state: m[2].trim().toUpperCase(),
    postalCode: m[3].trim(),
  };
}

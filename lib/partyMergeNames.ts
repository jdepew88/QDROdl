/**
 * Word-merge name formatting for parties with optional `fkaLastName`.
 *
 * **Semantics (intake / Party row):**
 * - `lastName` — current legal surname on the case caption (e.g. married name **Doe**).
 * - `fkaLastName` — surname the party is **restoring** / taking back (e.g. **Smith**).
 *
 * **Merge output examples** (Jane / Doe / Smith):
 * - Caption / case style: `JANE DOE`
 * - Line above address: `JANE SMITH (fka Doe)` — restored name in caps; `(fka …)` uses lowercase `fka` and title-case current surname.
 * - Signature block: `JANE SMITH`
 */

function upperName(s: string) {
  return (s || "").trim().toUpperCase();
}

/** Title-case current surname for the `(fka Doe)` tail only. */
function titleCaseSurnameForFka(s: string): string {
  const t = (s || "").trim();
  if (!t) return "";
  if (t.includes("-")) {
    return t
      .split("-")
      .map((part) =>
        part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : "",
      )
      .join("-");
  }
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

export function partyCaptionNameUpper(p: {
  firstName: string;
  lastName: string;
  fkaLastName?: string | null;
}): string {
  return upperName(`${p.firstName} ${p.lastName}`.trim());
}

/** Name line before street address (with FKA parenthetical when restoring a surname). */
export function partyAddressLineName(p: {
  firstName: string;
  lastName: string;
  fkaLastName?: string | null;
}): string {
  const revert = (p.fkaLastName || "").trim();
  if (!revert) {
    return partyCaptionNameUpper(p);
  }
  const fn = (p.firstName || "").trim();
  const curLast = (p.lastName || "").trim();
  const upperPersonal = `${fn} ${revert}`.trim().toUpperCase();
  return `${upperPersonal} (fka ${titleCaseSurnameForFka(curLast)})`.trim();
}

/** Typed / signature name (restored surname when FKA is set). */
export function partySignatureNameUpper(p: {
  firstName: string;
  lastName: string;
  fkaLastName?: string | null;
}): string {
  const revert = (p.fkaLastName || "").trim();
  if (!revert) {
    return partyCaptionNameUpper(p);
  }
  return upperName(`${p.firstName} ${revert}`.trim());
}

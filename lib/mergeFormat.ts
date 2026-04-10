/**
 * Formatting for Word merge / docx-templates data (view model + letters).
 */

/** Matter dates are stored as UTC date-only; avoid timezone shifting the calendar day. */
export function formatMergeDate(d: Date | string | null | undefined): string {
  if (d == null || d === "") return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const day = date.getUTCDate();
  const monthName = new Date(Date.UTC(y, m, 1)).toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  return `${monthName} ${String(day).padStart(2, "0")}, ${y}`;
}

/** Today's date for correspondence — local calendar day. */
export function formatMergeDateToday(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const day = now.getDate();
  const monthName = new Date(y, m, 1).toLocaleDateString("en-US", {
    month: "long",
  });
  return `${monthName} ${String(day).padStart(2, "0")}, ${y}`;
}

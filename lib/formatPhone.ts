/** Best-effort US display as (xxx) xxx-xxxx from digits or mixed input. */
export function formatPhoneUs(raw?: string | null): string {
  if (!raw) return "";
  const d = raw.replace(/\D/g, "");
  if (d.length === 10) {
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return raw.trim();
}

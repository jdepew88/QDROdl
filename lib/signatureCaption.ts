import { formatPhoneUs } from "@/lib/formatPhone";

/** Pleading-style caption block for a party appearing in pro per (double-spaced layout in Word). */
export function proPerCaptionBlock(input: {
  /** Current legal caption name, ALL CAPS (e.g. `JANE DOE`). */
  captionNameUpper: string;
  /** Line above street address — with FKA when applicable (e.g. `JANE SMITH (fka Doe)`). */
  addressLineName: string;
  role: "Petitioner" | "Respondent";
  address1: string;
  address2?: string | null;
  phone?: string | null;
}): string {
  const phone = formatPhoneUs(input.phone);
  const roleLabel =
    input.role.charAt(0).toUpperCase() + input.role.slice(1).toLowerCase();
  const lines = [
    `${roleLabel} ${input.captionNameUpper}`,
    input.addressLineName,
    input.address1,
    input.address2 || "",
    phone,
    "",
    `${roleLabel}, In Pro Per`,
  ];
  return lines.join("\n").replace(/\n\n\n+/g, "\n\n").trim();
}

export function attorneyCaptionBlock(input: {
  name: string;
  address1?: string | null;
  address2?: string | null;
  phone?: string | null;
  forLabel: "Attorney for Petitioner" | "Attorney for Respondent";
}): string {
  const phone = formatPhoneUs(input.phone);
  const lines = [
    input.name.toUpperCase(),
    input.address1 || "",
    input.address2 || "",
    phone,
    "",
    input.forLabel,
  ];
  return lines.join("\n").replace(/\n\n\n+/g, "\n\n").trim();
}

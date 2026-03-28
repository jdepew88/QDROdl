import { formatPhoneUs } from "@/lib/formatPhone";

/** Pleading-style caption block for a party appearing in pro per (double-spaced layout in Word). */
export function proPerCaptionBlock(input: {
  fullName: string;
  role: "Petitioner" | "Respondent";
  address1: string;
  address2?: string | null;
  phone?: string | null;
}): string {
  const phone = formatPhoneUs(input.phone);
  const lines = [
    `${input.fullName.toUpperCase()}, ${input.role}, In Pro Per`,
    input.address1,
    input.address2 || "",
    phone,
    "",
    `${input.role}, In Pro Per`,
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

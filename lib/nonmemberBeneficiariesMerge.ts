/** CalPERS Model B–style forms often use four beneficiary lines for the alternate payee. */
export const NONMEMBER_BENEFICIARY_SLOT_COUNT = 4;

export type NonmemberBeneficiaryInput = {
  fullName?: string;
  relationship?: string;
  address1?: string;
  address2?: string;
};

export type NonmemberBeneficiaryMergeRow = {
  index: number;
  name: string;
  relationship: string;
  address_line1: string;
  address_line2: string;
};

function rowFromInput(
  index: number,
  r: NonmemberBeneficiaryInput | null | undefined,
): NonmemberBeneficiaryMergeRow {
  return {
    index,
    name: (r?.fullName || "").trim(),
    relationship: (r?.relationship || "").trim(),
    address_line1: (r?.address1 || "").trim(),
    address_line2: (r?.address2 || "").trim(),
  };
}

/** Pads to four rows; sorts saved rows by `sortOrder` then order of appearance. */
export function mergeNonmemberBeneficiaryRows(
  saved: Array<{
    fullName: string;
    relationship: string | null;
    address1: string | null;
    address2: string | null;
    sortOrder: number;
  }>,
): {
  /** Use in DOCX with `{#nonmember_beneficiary_rows}` loops. */
  nonmember_beneficiary_rows: NonmemberBeneficiaryMergeRow[];
  /** Fixed slots: `{{nonmember_beneficiary.b1.name}}` … `b4`. */
  nonmember_beneficiary: Record<
    "b1" | "b2" | "b3" | "b4",
    Omit<NonmemberBeneficiaryMergeRow, "index">
  >;
} {
  const ordered = [...saved]
    .filter((x) => x.fullName.trim())
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, NONMEMBER_BENEFICIARY_SLOT_COUNT);

  const inputs: NonmemberBeneficiaryInput[] = ordered.map((x) => ({
    fullName: x.fullName,
    relationship: x.relationship ?? undefined,
    address1: x.address1 ?? undefined,
    address2: x.address2 ?? undefined,
  }));
  while (inputs.length < NONMEMBER_BENEFICIARY_SLOT_COUNT) {
    inputs.push({});
  }

  const rows: NonmemberBeneficiaryMergeRow[] = inputs.map((r, i) =>
    rowFromInput(i + 1, r),
  );

  const [r0, r1, r2, r3] = rows;
  const strip = (r: NonmemberBeneficiaryMergeRow) => ({
    name: r.name,
    relationship: r.relationship,
    address_line1: r.address_line1,
    address_line2: r.address_line2,
  });

  return {
    nonmember_beneficiary_rows: rows,
    nonmember_beneficiary: {
      b1: strip(r0),
      b2: strip(r1),
      b3: strip(r2),
      b4: strip(r3),
    },
  };
}

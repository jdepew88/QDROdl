/** Pronouns for the plan participant, from their spouse-type label (Husband/Wife). */
export type PronounSet = {
  subject: string;
  object: string;
  possessive: string;
  reflexive: string;
};

export function pronounsForSpouseType(
  spouseType: string | null | undefined,
): PronounSet {
  if (spouseType === "Wife") {
    return {
      subject: "she",
      object: "her",
      possessive: "her",
      reflexive: "herself",
    };
  }
  return {
    subject: "he",
    object: "him",
    possessive: "his",
    reflexive: "himself",
  };
}

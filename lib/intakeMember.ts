/** True when Petitioner is the plan member; false when Respondent is the member. */
export function petitionerIsPlanMember(
  p: { isMember?: boolean },
  r: { isMember?: boolean },
): boolean {
  if (r.isMember && !p.isMember) return false;
  if (p.isMember && !r.isMember) return true;
  return Boolean(p.isMember ?? true);
}

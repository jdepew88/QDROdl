import { redirect } from "next/navigation";

export default function PlansLegacyRedirect() {
  redirect("/all_plans");
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthCookieName, verifySession, normalizeEmail } from "@/lib/auth";
import { isSuperAdminEmail } from "@/lib/dashboardAccess";
import SuperAdminDashboard from "./SuperAdminDashboard";

export default async function SuperAdminPage() {
  const token = cookies().get(getAuthCookieName())?.value;
  const sess = verifySession(token);
  if (!sess) {
    redirect("/login?next=/dash/super-admin");
  }
  const ok = await isSuperAdminEmail(normalizeEmail(sess.email));
  if (!ok) {
    redirect("/dash");
  }
  return <SuperAdminDashboard />;
}

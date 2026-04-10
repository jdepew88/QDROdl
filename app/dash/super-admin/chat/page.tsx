import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthCookieName, normalizeEmail, verifySession } from "@/lib/auth";
import { isSuperAdminEmail, primarySuperAdminEmail } from "@/lib/dashboardAccess";
import ChatAdminConsole from "./ChatAdminConsole";

export default async function ChatAdminPage() {
  const token = cookies().get(getAuthCookieName())?.value;
  const sess = verifySession(token);
  if (!sess) redirect("/login?next=/dash/super-admin/chat");
  const email = normalizeEmail(sess.email);
  const isAdmin = await isSuperAdminEmail(email);
  if (!isAdmin) redirect("/dash");
  if (email !== normalizeEmail(primarySuperAdminEmail())) redirect("/dash/super-admin");
  return <ChatAdminConsole />;
}


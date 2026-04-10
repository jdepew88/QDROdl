import type { Matter, Party } from "@prisma/client";
import { normalizeEmail, verifySession, getAuthCookieName } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export function superAdminEmailsFromEnv(): Set<string> {
  const raw = process.env.SUPER_ADMIN_EMAILS || "";
  const set = new Set<string>();
  for (const part of raw.split(",")) {
    const e = normalizeEmail(part.trim());
    if (e) set.add(e);
  }
  return set;
}

export function getSessionEmailFromRequest(req: NextRequest): string | null {
  const token = req.cookies.get(getAuthCookieName())?.value || null;
  const s = verifySession(token);
  return s?.email ? normalizeEmail(s.email) : null;
}

export async function isSuperAdminEmail(email: string): Promise<boolean> {
  const n = normalizeEmail(email);
  if (superAdminEmailsFromEnv().has(n)) return true;
  const u = await prisma.user.findUnique({
    where: { email: n },
    select: { isSuperAdmin: true },
  });
  return Boolean(u?.isSuperAdmin);
}

export function userCanAccessMatter(
  matter: {
    petitioner: Party;
    respondent: Party;
    createdByEmail?: string | null;
  },
  userEmail: string,
  isAdmin: boolean,
): boolean {
  if (isAdmin) return true;
  const n = normalizeEmail(userEmail);
  const creator = matter.createdByEmail
    ? normalizeEmail(matter.createdByEmail)
    : "";
  if (creator && creator === n) return true;
  return (
    normalizeEmail(matter.petitioner.email) === n ||
    normalizeEmail(matter.respondent.email) === n
  );
}

export type MatterWithParties = Matter & {
  petitioner: Party;
  respondent: Party;
};

export async function requireSuperAdminRequest(req: NextRequest): Promise<
  | { ok: true; email: string }
  | { ok: false; response: NextResponse }
> {
  const email = getSessionEmailFromRequest(req);
  if (!email) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!(await isSuperAdminEmail(email))) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { ok: true as const, email };
}

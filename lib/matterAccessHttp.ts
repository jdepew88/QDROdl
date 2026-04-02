import { NextRequest, NextResponse } from "next/server";
import type { AttorneyInfo, Matter, Party, PlanSelection } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  getSessionEmailFromRequest,
  isSuperAdminEmail,
  userCanAccessMatter,
} from "@/lib/dashboardAccess";

export type MatterAccessBundle = Matter & {
  petitioner: Party;
  respondent: Party;
  plans: PlanSelection[];
  attorneys: AttorneyInfo[];
};

export async function requireMatterAccess(
  req: NextRequest,
  matterId: string,
): Promise<
  | { ok: true; email: string; isAdmin: boolean; matter: MatterAccessBundle }
  | { ok: false; response: NextResponse }
> {
  const email = getSessionEmailFromRequest(req);
  if (!email) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  const isAdmin = await isSuperAdminEmail(email);
  const matter = await prisma.matter.findUnique({
    where: { id: matterId },
    include: {
      petitioner: true,
      respondent: true,
      plans: true,
      attorneys: true,
    },
  });
  if (!matter) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Not found" }, { status: 404 }),
    };
  }
  if (!userCanAccessMatter(matter, email, isAdmin)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { ok: true as const, email, isAdmin, matter };
}

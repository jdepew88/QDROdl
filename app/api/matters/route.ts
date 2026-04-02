import { NextRequest, NextResponse } from "next/server";
import {
  getSessionEmailFromRequest,
  isSuperAdminEmail,
} from "@/lib/dashboardAccess";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      matters: [],
      dbConfigured: false,
      message: "DATABASE_URL is not set. Configure .env.local to load matters.",
    });
  }

  const email = getSessionEmailFromRequest(req);
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const admin = await isSuperAdminEmail(email);

    const matters = await prisma.matter.findMany({
      where: admin
        ? undefined
        : {
            OR: [
              { petitioner: { email: { equals: email, mode: "insensitive" } } },
              { respondent: { email: { equals: email, mode: "insensitive" } } },
            ],
          },
      orderBy: { createdAt: "desc" },
      take: admin ? 500 : 100,
      include: {
        petitioner: true,
        respondent: true,
        plans: true,
      },
    });

    return NextResponse.json({
      dbConfigured: true,
      isSuperAdmin: admin,
      matters: matters.map((m) => ({
        id: m.id,
        caseNumber: m.caseNumber,
        county: m.county,
        createdAt: m.createdAt,
        intakeCompletedAt: m.intakeCompletedAt,
        workflowStatus: m.workflowStatus,
        petitionerName: `${m.petitioner.firstName} ${m.petitioner.lastName}`,
        respondentName: `${m.respondent.firstName} ${m.respondent.lastName}`,
        planKeys: m.plans.map((p) => p.planKey),
      })),
    });
  } catch (e: any) {
    console.error(e);
    const msg =
      typeof e?.message === "string" ? e.message : "Failed to load matters";
    return NextResponse.json(
      {
        matters: [],
        dbConfigured: false,
        error: msg,
      },
      { status: 200 },
    );
  }
}

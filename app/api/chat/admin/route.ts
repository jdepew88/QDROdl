import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePrimarySuperAdminRequest } from "@/lib/dashboardAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const gate = await requirePrimarySuperAdminRequest(req);
  if (gate.ok === false) return gate.response;

  const [entries, logs] = await Promise.all([
    prisma.chatKnowledgeEntry.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
    }),
    prisma.chatConversationLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    }),
  ]);
  return NextResponse.json({ entries, logs });
}


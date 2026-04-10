import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { DOCUMENTS_DIR } from "@/lib/renderTemplates";
import { groupDraftFilesByPlan } from "@/lib/draftInventory";
import { requireMatterAccess } from "@/lib/matterAccessHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const gate = await requireMatterAccess(req, params.matterId);
  if (gate.ok === false) return gate.response;

  const matterId = params.matterId;
  const dir = path.join(DOCUMENTS_DIR, matterId);
  let names: string[] = [];
  try {
    names = await fs.readdir(dir);
  } catch {
    names = [];
  }

  const files = await Promise.all(
    names.map(async (name) => {
      const fullPath = path.join(dir, name);
      const stat = await fs.stat(fullPath).catch(() => null);
      return {
        name,
        url: `/documents/${matterId}/${encodeURIComponent(name)}`,
        updatedAt: stat?.mtime ? stat.mtime.toISOString() : null,
        size: stat?.size ?? null,
      };
    }),
  );

  const grouped = groupDraftFilesByPlan(
    files,
    gate.matter.plans,
    gate.matter.petitionerIsMember,
    gate.matter.petitioner.spouseType,
  );

  return NextResponse.json(grouped);
}

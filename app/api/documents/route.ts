import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { DOCUMENTS_DIR } from "@/lib/renderTemplates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const matterId = searchParams.get("matterId");
  if (!matterId) {
    return NextResponse.json({ error: "Missing matterId" }, { status: 400 });
  }

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
        url: `/documents/${matterId}/${name}`,
        updatedAt: stat?.mtime ?? null,
        size: stat?.size ?? null,
      };
    }),
  );

  files.sort((a, b) => {
    const at = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bt - at;
  });

  return NextResponse.json({ matterId, files });
}


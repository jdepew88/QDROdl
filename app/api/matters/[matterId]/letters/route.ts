import { NextRequest, NextResponse } from "next/server";
import {
  LETTER_TEMPLATE_REGISTRY,
  type LetterTemplateKey,
} from "@/data/letterTemplates";
import { buildLetterMergeModel } from "@/lib/letterMergeModel";
import {
  renderDocxFromTemplate,
  saveDraftBuffer,
  templateFileExists,
} from "@/lib/renderTemplates";
import { requireMatterAccess } from "@/lib/matterAccessHttp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { matterId: string } },
) {
  const { matterId } = params;
  const gate = await requireMatterAccess(req, matterId);
  if (gate.ok === false) return gate.response;

  const body = await req.json().catch(() => ({}));
  const letterKey = body?.letterKey as LetterTemplateKey | undefined;
  if (!letterKey || !(letterKey in LETTER_TEMPLATE_REGISTRY)) {
    return NextResponse.json(
      { error: "Invalid letterKey", valid: Object.keys(LETTER_TEMPLATE_REGISTRY) },
      { status: 400 },
    );
  }

  const def = LETTER_TEMPLATE_REGISTRY[letterKey];
  const ok = await templateFileExists(def.relativePath);
  if (!ok) {
    return NextResponse.json(
      {
        error: `Letter template missing: templates/${def.relativePath}`,
        missing: [`templates/${def.relativePath}`],
      },
      { status: 400 },
    );
  }

  try {
    const data = await buildLetterMergeModel(matterId);
    const buf = await renderDocxFromTemplate(def.relativePath, data);
    await saveDraftBuffer({
      matterId,
      fileStem: def.templateId,
      format: "docx",
      buf,
    });
    const filename = `${def.templateId}.docx`;
    return new NextResponse(Buffer.from(buf), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Letter render failed" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import Archiver from "archiver";
import { buildViewModel } from "@/lib/viewModel";
import { TEMPLATE_FILES } from "@/data/templates";
import {
  renderDocxFromTemplate,
  docxBufferToPdfBuffer,
  saveDraftBuffer,
  templateFileExists,
} from "@/lib/renderTemplates";

export const runtime = "nodejs";

async function persistRenderedDrafts(
  matterId: string,
  rendered: { name: string; buf: Buffer }[],
): Promise<string[]> {
  const links: string[] = [];
  for (const r of rendered) {
    const stem = path
      .parse(r.name)
      .name.replace(/__PDF_FAILED__use_docx$/, "");
    const ext = r.name.toLowerCase().endsWith(".pdf") ? "pdf" : "docx";
    const saved = await saveDraftBuffer({
      matterId,
      fileStem: stem,
      format: ext as "docx" | "pdf",
      buf: r.buf,
    });
    links.push(saved.relative);
  }
  return links;
}

export async function POST(req: NextRequest) {
  try {
    const { matterId, templateIds, format, delivery } = await req.json();
    if (!matterId || !templateIds?.length) {
      return NextResponse.json(
        { error: "Missing matterId or templates" },
        { status: 400 },
      );
    }

    const missing: string[] = [];
    for (const id of templateIds) {
      const file = TEMPLATE_FILES[id as keyof typeof TEMPLATE_FILES];
      if (!file) {
        missing.push(`Unknown template id: ${id}`);
        continue;
      }
      const ok = await templateFileExists(file);
      if (!ok) missing.push(`Missing file: templates/${file}`);
    }
    if (missing.length > 0) {
      return NextResponse.json(
        {
          error:
            "Template Word files are missing on the server. Add the listed .docx files under templates/ (see data/templates.ts).",
          missing,
        },
        { status: 400 },
      );
    }

    const vm = await buildViewModel(matterId);
    const rendered: { name: string; buf: Buffer }[] = [];

    for (const id of templateIds) {
      const file = TEMPLATE_FILES[id as keyof typeof TEMPLATE_FILES]!;
      const base = path.parse(file).name;
      const docx = await renderDocxFromTemplate(file, vm);
      if (format === "pdf") {
        try {
          const pdf = await docxBufferToPdfBuffer(docx);
          rendered.push({ name: `${base}.pdf`, buf: pdf });
        } catch {
          rendered.push({
            name: `${base}__PDF_FAILED__use_docx.docx`,
            buf: docx,
          });
        }
      } else {
        rendered.push({ name: `${base}.docx`, buf: docx });
      }
    }

    if (rendered.length === 0) {
      return NextResponse.json(
        { error: "No documents were generated." },
        { status: 400 },
      );
    }

    if (delivery === "save") {
      const links = await persistRenderedDrafts(matterId, rendered);
      return NextResponse.json({ ok: true, files: links });
    }

    // Download ZIP: still persist to server so clients can re-download from the matter anytime.
    await persistRenderedDrafts(matterId, rendered);

    const chunks: Buffer[] = [];
    const arch = Archiver("zip", { zlib: { level: 9 } });
    arch.on("data", (d) => chunks.push(d as Buffer));
    const finalize = new Promise<void>((res, rej) => {
      arch.on("warning", (e) => console.warn(e));
      arch.on("error", rej);
      arch.on("end", () => res());
    });
    for (const r of rendered) arch.append(r.buf, { name: r.name });
    arch.finalize();
    await finalize;
    const blob = Buffer.concat(chunks);
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="drafts_${matterId}.zip"`,
      },
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Render error" },
      { status: 500 },
    );
  }
}

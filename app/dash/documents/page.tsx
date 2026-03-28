"use client";

import Link from "next/link";
import { LETTER_TEMPLATE_REGISTRY } from "@/data/letterTemplates";
import { GUIDE_DOCUMENTS, guidePublicPath } from "@/data/guideDocuments";

export default function DocumentsHubPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-10 lg:py-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Documents
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-stone-50">
        Drafts, letters & guides
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        <Link href="/dash" className="text-lime-400 hover:underline">
          Back to overview
        </Link>
      </p>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-lime-100">Draft orders</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Merged QDRO/DRO Word files live under each matter after you generate
          from intake. Open a case from the{" "}
          <Link href="/dash" className="text-lime-400 underline">
            overview
          </Link>{" "}
          to download individual files or a full ZIP as often as you like.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-lime-100">
          Letters & non-filed attachment
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          These use Word templates under{" "}
          <code className="rounded bg-black/40 px-1">templates/letters/</code>{" "}
          with QDROdl.app branding (no prior law-office letterhead). Signatory
          line: <strong className="text-zinc-300">Joseph Depew</strong>, QDRO
          Support Specialist. Generate from each matter&apos;s page.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          {Object.entries(LETTER_TEMPLATE_REGISTRY).map(([key, def]) => (
            <li key={key} className="rounded-lg border border-white/10 bg-zinc-950/50 p-4">
              <p className="font-medium text-stone-200">{def.title}</p>
              <p className="mt-1 text-xs text-zinc-500">{def.description}</p>
              <p className="mt-2 font-mono text-xs text-zinc-500">
                templates/{def.relativePath}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-lime-100">
          How-to guides (placeholders)
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Add PDFs to{" "}
          <code className="rounded bg-black/40 px-1">public/documents/guides/</code>{" "}
          using the filenames below. Links will work once the files exist.
        </p>
        <ul className="mt-4 space-y-3">
          {GUIDE_DOCUMENTS.map((g) => (
            <li
              key={g.id}
              className="flex flex-col gap-1 rounded-lg border border-white/10 bg-zinc-950/50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-stone-200">{g.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{g.description}</p>
                <p className="mt-2 font-mono text-xs text-zinc-600">
                  public/documents/guides/{g.placeholderFilename}
                </p>
              </div>
              <a
                href={guidePublicPath(g.placeholderFilename)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-sm text-lime-400 hover:underline"
              >
                Open / download
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

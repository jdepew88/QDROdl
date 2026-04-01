"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  LETTER_TEMPLATE_REGISTRY,
  type LetterTemplateKey,
} from "@/data/letterTemplates";

type DocFile = {
  name: string;
  url: string;
  updatedAt: string | null;
  size: number | null;
};

export default function MatterDocumentsPage({
  params,
}: {
  params: { matterId: string };
}) {
  const matterId = params.matterId;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<DocFile[]>([]);
  const [zipLoading, setZipLoading] = useState(false);
  const [letterKeyLoading, setLetterKeyLoading] = useState<LetterTemplateKey | null>(
    null,
  );
  const [letterError, setLetterError] = useState<string | null>(null);
  const [preapprovalLoading, setPreapprovalLoading] = useState(false);
  const [preapprovalError, setPreapprovalError] = useState<string | null>(null);
  const [preapprovalDoc, setPreapprovalDoc] = useState<{
    fileUrl: string;
    title: string;
    version: number;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/documents?matterId=${matterId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load documents");
        if (!cancelled) setFiles(json?.files || []);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load documents");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [matterId]);

  const empty = useMemo(() => !loading && !error && files.length === 0, [
    loading,
    error,
    files.length,
  ]);

  const generatePreapprovalLetter = async () => {
    setPreapprovalError(null);
    setPreapprovalDoc(null);
    setPreapprovalLoading(true);
    try {
      const res = await fetch("/api/documents/preapproval-letter/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matterId }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(j.error || `Generation failed (${res.status})`);
      }
      if (j.success && j.document) {
        setPreapprovalDoc({
          fileUrl: j.document.fileUrl,
          title: j.document.title,
          version: j.document.version,
          createdAt: j.document.createdAt,
        });
      }
    } catch (e: any) {
      setPreapprovalError(e.message || "Could not generate preapproval letter");
    } finally {
      setPreapprovalLoading(false);
    }
  };

  const downloadLetter = async (letterKey: LetterTemplateKey) => {
    setLetterError(null);
    setLetterKeyLoading(letterKey);
    try {
      const res = await fetch(`/api/matters/${matterId}/letters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letterKey }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Letter download failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const def = LETTER_TEMPLATE_REGISTRY[letterKey];
      a.download = `${def.templateId}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setLetterError(e.message || "Could not generate letter");
    } finally {
      setLetterKeyLoading(null);
    }
  };

  const downloadAllZip = async () => {
    setZipLoading(true);
    try {
      const res = await fetch(`/api/documents/zip?matterId=${matterId}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Download failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `drafts_${matterId}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(e.message || "Could not build ZIP");
    } finally {
      setZipLoading(false);
    }
  };

  const onDeleteMatter = async () => {
    if (
      !confirm(
        "Delete this matter and all related records? Files in /documents for this id are not removed automatically.",
      )
    )
      return;
    try {
      const res = await fetch(`/api/matters/${matterId}`, { method: "DELETE" });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Delete failed");
      router.push("/dash");
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(1000px_circle_at_0%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_circle_at_100%_0%,rgba(168,85,247,0.14),transparent_55%)] p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-zinc-300/90">
              MATTER
            </p>
            <h1 className="mt-2 truncate text-2xl font-semibold text-stone-50">
              {matterId}
            </h1>
            <p className="mt-2 text-sm text-zinc-300">
              Drafts from the review step are stored here (including when you chose
              ZIP download). Download any file again as often as you like, or grab
              everything in one ZIP.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dash"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link
              href={`/dash/matter/${matterId}/edit`}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Edit case / parties
            </Link>
            <button
              type="button"
              onClick={downloadAllZip}
              disabled={zipLoading || loading || files.length === 0}
              className="rounded-xl border border-lime-600/50 bg-lime-950/40 px-5 py-3 text-sm font-semibold text-lime-100 hover:bg-lime-900/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {zipLoading ? "Preparing ZIP…" : "Download all as ZIP"}
            </button>
            <Link
              href="/intake/review"
              className="rounded-xl bg-lime-800 px-5 py-3 text-sm font-semibold text-stone-50 hover:bg-lime-700"
            >
              Generate drafts
            </Link>
            <button
              type="button"
              onClick={onDeleteMatter}
              className="rounded-xl border border-rose-500/40 px-4 py-3 text-sm font-semibold text-rose-200 hover:bg-rose-950/40"
            >
              Delete matter
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}

      {letterError && (
        <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          {letterError}
        </div>
      )}

      {preapprovalError && (
        <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          {preapprovalError}
        </div>
      )}

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-lime-100">
          Plan preapproval (PDF)
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Generate a CalPERS Model A preliminary-review letter from this
          matter&apos;s database record (HTML → PDF on the server). Requires
          CalPERS, not in pay, Model A.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={generatePreapprovalLetter}
            disabled={preapprovalLoading}
            className="rounded-lg border border-lime-600/50 bg-lime-950/40 px-4 py-2.5 text-sm font-semibold text-lime-100 hover:bg-lime-900/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {preapprovalLoading ? "Generating PDF…" : "Generate Preapproval Letter"}
          </button>
          {preapprovalDoc && (
            <a
              href={preapprovalDoc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-stone-100 hover:bg-white/15"
            >
              Open PDF (v{preapprovalDoc.version})
            </a>
          )}
        </div>
        {preapprovalDoc && (
          <p className="mt-3 text-xs text-zinc-500">
            {preapprovalDoc.title} —{" "}
            {new Date(preapprovalDoc.createdAt).toLocaleString()}
          </p>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-lime-100">
          Letters &amp; non-filed attachment
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Word templates live in{" "}
          <code className="rounded bg-black/30 px-1">templates/letters/</code>.
          Each download merges this matter&apos;s data, saves a copy alongside your
          drafts, and uses QDROdl.app branding (Joseph Depew, QDRO Support
          Specialist).           If the API reports a missing template, add the matching{" "}
          <code className="rounded bg-black/30 px-1">.docx</code> file on the server.
        </p>
        <ul className="mt-5 space-y-3">
          {(Object.keys(LETTER_TEMPLATE_REGISTRY) as LetterTemplateKey[]).map(
            (key) => {
              const def = LETTER_TEMPLATE_REGISTRY[key];
              const busy = letterKeyLoading === key;
              return (
                <li
                  key={key}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-zinc-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-stone-200">{def.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{def.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadLetter(key)}
                    disabled={Boolean(letterKeyLoading)}
                    className="shrink-0 rounded-lg border border-lime-600/50 bg-lime-950/40 px-4 py-2.5 text-sm font-semibold text-lime-100 hover:bg-lime-900/40 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {busy ? "Generating…" : "Download DOCX"}
                  </button>
                </li>
              );
            },
          )}
        </ul>
      </section>

      {loading && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          Loading…
        </div>
      )}

      {empty && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          <p className="font-medium text-stone-200">No server-saved files yet</p>
          <p className="mt-2 text-zinc-400">
            Go to <Link href="/intake/review" className="text-lime-400 underline">Review</Link> and run{" "}
            <strong>Save matter &amp; generate</strong> (either delivery option stores
            files here). Ensure matching <code className="rounded bg-black/30 px-1">.docx</code>{" "}
            templates exist under <code className="rounded bg-black/30 px-1">templates/</code> on
            the server.
          </p>
        </div>
      )}

      {!loading && !error && files.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
            <div className="text-sm font-semibold tracking-wide text-zinc-200">
              SAVED DOCUMENTS
            </div>
            <div className="text-xs text-zinc-400">{files.length} file(s)</div>
          </div>
          <ul className="divide-y divide-white/10">
            {files.map((f) => (
              <li
                key={f.url}
                className="flex items-center justify-between gap-4 px-6 py-5"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-stone-50">
                    {f.name}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">
                    {f.updatedAt ? new Date(f.updatedAt).toLocaleString() : ""}{" "}
                    {typeof f.size === "number" ? `• ${f.size} bytes` : ""}
                  </div>
                </div>
                <a
                  href={f.url}
                  className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

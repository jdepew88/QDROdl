"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<DocFile[]>([]);

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
              Saved drafts live under{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5">
                /public/documents/{matterId}
              </code>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dash"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Back to dashboard
            </Link>
            <Link
              href="/intake/review"
              className="rounded-xl bg-lime-800 px-5 py-3 text-sm font-semibold text-stone-50 hover:bg-lime-700"
            >
              Generate drafts
            </Link>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          Loading…
        </div>
      )}

      {empty && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          No saved documents yet for this matter. Use “Generate drafts” and pick
          “Save to /documents”.
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


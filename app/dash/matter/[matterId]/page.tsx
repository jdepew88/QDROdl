"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  LETTER_TEMPLATE_REGISTRY,
  type LetterTemplateKey,
} from "@/data/letterTemplates";
import { planLabelForKey } from "@/lib/planDisplay";

type DocFile = {
  name: string;
  url: string;
  updatedAt: string | null;
  size: number | null;
};

type PlanGroup = {
  planSelectionId: string;
  planKey: string;
  label: string;
  joinderRequired: boolean;
  stems: string[];
  files: DocFile[];
};

type DraftInventory = {
  planGroups: PlanGroup[];
  letterFiles: DocFile[];
  otherFiles: DocFile[];
};

type MatterPlan = { id: string; planKey: string };

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
  const [inventory, setInventory] = useState<DraftInventory | null>(null);
  const [matterPlans, setMatterPlans] = useState<MatterPlan[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [uploads, setUploads] = useState<
    {
      id: string;
      fileName: string;
      fileUrl: string;
      category: string;
      planKey: string | null;
      note: string | null;
      createdAt: string;
    }[]
  >([]);
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

  const [uploadCategory, setUploadCategory] = useState<
    "judgment" | "other" | "plan_statement"
  >("judgment");
  const [uploadPlanKey, setUploadPlanKey] = useState("");
  const [uploadNote, setUploadNote] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  const reloadUploads = async () => {
    const res = await fetch(`/api/matters/${matterId}/uploads`);
    if (!res.ok) return;
    const j = await res.json();
    setUploads(j.uploads || []);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [meRes, docRes, invRes, matterRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch(`/api/documents?matterId=${matterId}`),
          fetch(`/api/matters/${matterId}/draft-inventory`),
          fetch(`/api/matters/${matterId}`),
        ]);
        const meJ = await meRes.json().catch(() => ({}));
        if (!cancelled) setIsSuperAdmin(Boolean(meJ.isSuperAdmin));

        const json = await docRes.json();
        if (!docRes.ok) throw new Error(json?.error || "Failed to load documents");
        if (!cancelled) setFiles(json?.files || []);

        if (invRes.ok) {
          const inv = await invRes.json();
          if (!cancelled) setInventory(inv);
        }

        if (matterRes.ok) {
          const mj = await matterRes.json();
          const plans = mj?.matter?.plans || [];
          if (!cancelled) {
            setMatterPlans(
              plans.map((p: { id: string; planKey: string }) => ({
                id: p.id,
                planKey: p.planKey,
              })),
            );
          }
          await reloadUploads();
        }
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
        "Delete this matter and all related records? Staff-only. Files under /documents are not removed automatically.",
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

  const submitUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadMsg("Choose a file.");
      return;
    }
    setUploadBusy(true);
    setUploadMsg(null);
    try {
      const fd = new FormData();
      fd.set("file", uploadFile);
      fd.set("category", uploadCategory);
      if (uploadPlanKey.trim()) fd.set("planKey", uploadPlanKey.trim());
      if (uploadNote.trim()) fd.set("note", uploadNote.trim());
      const res = await fetch(`/api/matters/${matterId}/uploads`, {
        method: "POST",
        body: fd,
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Upload failed");
      setUploadFile(null);
      setUploadNote("");
      setUploadMsg("Uploaded.");
      await reloadUploads();
    } catch (err: unknown) {
      setUploadMsg(err instanceof Error ? err.message : "Upload error");
    } finally {
      setUploadBusy(false);
    }
  };

  const groupsToShow = inventory?.planGroups?.length
    ? inventory.planGroups
    : matterPlans.map((p) => ({
        planSelectionId: p.id,
        planKey: p.planKey,
        label: planLabelForKey(p.planKey),
        joinderRequired: false,
        stems: [],
        files: [],
      }));

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(1000px_circle_at_0%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_circle_at_100%_0%,rgba(168,85,247,0.14),transparent_55%)] p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-zinc-300/90">
              MATTER
            </p>
            <h1 className="mt-2 truncate text-2xl font-semibold text-stone-50">
              Case workspace
            </h1>
            <p className="mt-2 text-sm text-zinc-300">
              Draft orders grouped by retirement plan. Upload your judgment and plan
              statements (account printouts, DC balance as of date of separation or
              quarter-end, or any document showing plan name).
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
            {isSuperAdmin && (
              <button
                type="button"
                onClick={onDeleteMatter}
                className="rounded-xl border border-rose-500/40 px-4 py-3 text-sm font-semibold text-rose-200 hover:bg-rose-950/40"
              >
                Delete matter
              </button>
            )}
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}

      <section className="mt-10 space-y-8">
        <h2 className="text-lg font-semibold text-lime-100">
          Draft orders by plan
        </h2>
        {groupsToShow.map((g) => (
          <div
            key={g.planSelectionId}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-white">{g.label}</h3>
              {g.joinderRequired && (
                <span className="rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 text-xs font-medium text-amber-100">
                  Joinder may apply — confirm with counsel
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-zinc-400">
              Download the generated Word/PDF files for this plan. If nothing appears
              yet, run <strong>Save matter &amp; generate</strong> from review.
            </p>
            {g.files.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">No matching drafts on file yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10">
                {g.files.map((f) => (
                  <li
                    key={f.url}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <span className="truncate text-sm text-zinc-200">{f.name}</span>
                    <a
                      href={f.url}
                      className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-lime-100">Upload documents</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Judgment of dissolution, plan statements, or other PDFs/images. Optional: tie
          a <strong>plan statement</strong> upload to a specific plan when both spouses
          have multiple QDROs.
        </p>
        <form onSubmit={submitUpload} className="mt-4 space-y-4">
          {uploadMsg && (
            <p className="text-sm text-zinc-300">{uploadMsg}</p>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-xs text-zinc-500">
              Category
              <select
                className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
                value={uploadCategory}
                onChange={(e) =>
                  setUploadCategory(e.target.value as typeof uploadCategory)
                }
              >
                <option value="judgment">Judgment of dissolution</option>
                <option value="plan_statement">Plan statement / account document</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="block text-xs text-zinc-500">
              Related plan (optional)
              <select
                className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
                value={uploadPlanKey}
                onChange={(e) => setUploadPlanKey(e.target.value)}
              >
                <option value="">— Not specific to one plan —</option>
                {matterPlans.map((p) => (
                  <option key={p.id} value={p.planKey}>
                    {planLabelForKey(p.planKey)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-xs text-zinc-500">
            Note (what you&apos;re sending, DOS quarter, etc.)
            <textarea
              className="mt-1 min-h-[72px] w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
              value={uploadNote}
              onChange={(e) => setUploadNote(e.target.value)}
              placeholder="e.g. LACERA DRO attachment; Fidelity DC balance 12/31/2024 statement"
            />
          </label>
          <input
            type="file"
            onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
            className="text-sm text-zinc-300"
          />
          <div>
            <button
              type="submit"
              disabled={uploadBusy}
              className="rounded-lg bg-lime-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-lime-700 disabled:opacity-40"
            >
              {uploadBusy ? "Uploading…" : "Upload"}
            </button>
          </div>
        </form>

        {uploads.length > 0 && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-sm font-semibold text-zinc-300">Your uploads</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              {uploads.map((u) => (
                <li
                  key={u.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-zinc-950/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="truncate text-zinc-200">{u.fileName}</div>
                    <div className="text-xs">
                      {u.category}
                      {u.planKey ? ` • ${planLabelForKey(u.planKey)}` : ""}
                      {u.note ? ` — ${u.note}` : ""}
                    </div>
                  </div>
                  <a
                    href={u.fileUrl}
                    className="shrink-0 text-lime-400 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

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
            <>
              <a
                href={preapprovalDoc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-stone-100 hover:bg-white/15"
              >
                Open PDF (v{preapprovalDoc.version})
              </a>
              <a
                href={preapprovalDoc.fileUrl}
                download
                className="rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-stone-100 hover:bg-white/15"
              >
                Download PDF
              </a>
            </>
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
          Word templates merge this matter&apos;s data and save a copy alongside your
          drafts.
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

      {inventory && inventory.letterFiles.length > 0 && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-zinc-200">Saved letter files</h2>
          <ul className="mt-4 divide-y divide-white/10">
            {inventory.letterFiles.map((f) => (
              <li
                key={f.url}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="truncate text-sm text-zinc-200">{f.name}</span>
                <a
                  href={f.url}
                  className="shrink-0 text-sm text-lime-400 underline"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {inventory && inventory.otherFiles.length > 0 && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-zinc-200">Other saved drafts</h2>
          <ul className="mt-4 divide-y divide-white/10">
            {inventory.otherFiles.map((f) => (
              <li
                key={f.url}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="truncate text-sm text-zinc-200">{f.name}</span>
                <a
                  href={f.url}
                  className="shrink-0 text-sm text-lime-400 underline"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {loading && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          Loading…
        </div>
      )}

      {empty && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          <p className="font-medium text-stone-200">No server-saved drafts yet</p>
          <p className="mt-2 text-zinc-400">
            Go to <Link href="/intake/review" className="text-lime-400 underline">Review</Link> and run{" "}
            <strong>Save matter &amp; generate</strong>.
          </p>
        </div>
      )}

      {!loading && !error && files.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
            <div className="text-sm font-semibold tracking-wide text-zinc-200">
              ALL SAVED DOCUMENTS
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

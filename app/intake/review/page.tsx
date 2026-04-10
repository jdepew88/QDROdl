"use client";

import Link from "next/link";
import { useIntake } from "../_state/useIntake";
import {
  pickTemplateForPlan,
  TEMPLATE_FILES,
} from "@/data/templates";
import { petitionerIsPlanMember } from "@/lib/intakeMember";
import { useState } from "react";

export default function ReviewStep() {
  const s = useIntake();
  const [format, setFormat] = useState<"docx" | "pdf">("docx");
  const [delivery, setDelivery] = useState<"download" | "save">("download");
  const [saving, setSaving] = useState(false);
  const [savedLinks, setSavedLinks] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [matterIdSaved, setMatterIdSaved] = useState<string | null>(null);

  const petitionerMember = petitionerIsPlanMember(s.petitioner, s.respondent);

  const templateIds = (s.planAnswers || []).flatMap((ans) =>
    pickTemplateForPlan({
      plan: ans.plan,
      isInPayStatus: ans.isInPayStatus,
      usesTimeRule: ans.usesTimeRule,
      laceraOption4: ans.laceraOption4,
      petitionerIsMember: petitionerMember,
      petitionerSpouseType: s.petitioner.spouseType,
      calpersOrderModel: ans.calpersOrderModel,
      calpersOption3W: ans.calpersOption3W,
      calpersModelCForm: ans.calpersModelCForm,
    }),
  );

  const fileNames = templateIds
    .map((id) => TEMPLATE_FILES[id])
    .filter(Boolean);

  const canGenerate = templateIds.length > 0;

  const submitIntakeOnly = async () => {
    setSaving(true);
    setError(null);
    setSavedLinks(null);
    setMatterIdSaved(null);
    try {
      const matterRes = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intake: s, chosenTemplates: templateIds }),
      });
      const matterJson = await matterRes.json();
      if (!matterRes.ok) {
        throw new Error(matterJson?.error || "Intake submit failed");
      }
      setMatterIdSaved(matterJson.matterId ?? null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const generate = async () => {
    setSaving(true);
    setError(null);
    setSavedLinks(null);
    setMatterIdSaved(null);
    try {
      const matterRes = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intake: s, chosenTemplates: templateIds }),
      });
      const matterJson = await matterRes.json();
      if (!matterRes.ok) {
        throw new Error(matterJson?.error || "Intake submit failed");
      }
      const matterId = matterJson.matterId;
      const res = await fetch("/api/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matterId, templateIds, format, delivery }),
      });
      if (delivery === "download") {
        const blob = await res.blob();
        if (!res.ok) {
          const errText = await blob.text().catch(() => "");
          let msg = errText || "Failed to generate drafts";
          try {
            const j = JSON.parse(errText);
            if (j?.error) msg = j.error;
            if (j?.missing?.length) {
              msg += ` Missing: ${j.missing.join("; ")}`;
            }
          } catch {
            /* plain text */
          }
          throw new Error(msg);
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `drafts_${matterId}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            data?.error
              ? `${data.error}${data.missing?.length ? ` — ${data.missing.join("; ")}` : ""}`
              : "Failed to save drafts",
          );
        }
        setSavedLinks(data.files || []);
      }
      setMatterIdSaved(matterId);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Step 5
      </p>
      <h1 className="mb-2 text-2xl font-bold text-stone-50">
        Review & generate drafts
      </h1>
      <p className="mb-6 text-sm text-zinc-300">
        <Link
          href="/intake/plan-questions"
          className="text-lime-400 underline-offset-2 hover:underline"
        >
          Back to plan questions
        </Link>
      </p>

      {!canGenerate && (
        <div className="mb-6 rounded-2xl border border-amber-500/40 bg-amber-950/50 p-4 text-sm text-amber-100">
          No Word templates are mapped for the plans you selected, or plans were
          not chosen. You can still{" "}
          <strong className="text-amber-50">save the intake</strong> to the
          database. Generation runs when matching{" "}
          <code className="rounded bg-black/30 px-1">.docx</code> files exist
          under <code className="rounded bg-black/30 px-1">templates/</code> (see{" "}
          <code className="rounded bg-black/30 px-1">data/templates.ts</code>
          ).
        </div>
      )}

      {canGenerate && (
        <div className="mb-6 rounded-2xl border border-sky-500/30 bg-sky-950/40 p-4 text-sm text-sky-100">
          <p className="font-medium text-sky-50">Downloads &amp; your matter folder</p>
          <p className="mt-2 text-sky-100/90">
            Every successful generation <strong>stores dated copies on the server</strong>{" "}
            under this matter so you (or your client) can download them again anytime
            from the dashboard — individual files or a full ZIP.{" "}
            <strong>Download ZIP</strong> also saves that ZIP to your device now;{" "}
            <strong>Save to server only</strong> skips the browser download and shows
            links on the confirmation screen.
          </p>
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="mb-2 font-semibold text-stone-100">
          Templates to generate
        </h2>
        {fileNames.length === 0 ? (
          <p className="text-sm text-zinc-400">None selected.</p>
        ) : (
          <ul className="list-inside list-disc text-sm text-zinc-200">
            {fileNames.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Output format
          </label>
          <select
            className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-stone-50 outline-none ring-lime-700/30 focus:ring-2"
            value={format}
            onChange={(e) => setFormat(e.target.value as "docx" | "pdf")}
            disabled={!canGenerate}
          >
            <option value="docx">Word (.docx)</option>
            <option value="pdf">PDF (requires LibreOffice on server)</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Delivery
          </label>
          <select
            className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-stone-50 outline-none ring-lime-700/30 focus:ring-2"
            value={delivery}
            onChange={(e) =>
              setDelivery(e.target.value as "download" | "save")
            }
            disabled={!canGenerate}
          >
            <option value="download">ZIP to this device + save on server</option>
            <option value="save">Save on server only (links, no ZIP prompt)</option>
          </select>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <button
            type="button"
            onClick={generate}
            disabled={saving || !canGenerate}
            className="w-full rounded-xl bg-lime-800 px-6 py-3 font-semibold text-stone-50 hover:bg-lime-700 disabled:opacity-50"
          >
            {saving && canGenerate ? "Working…" : "Save matter & generate"}
          </button>
          <button
            type="button"
            onClick={submitIntakeOnly}
            disabled={saving}
            className="w-full rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/5 disabled:opacity-50"
          >
            Save matter only (no files)
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-rose-500/40 bg-rose-950/50 p-3 text-sm text-rose-100">
          {error}
        </p>
      )}
      {matterIdSaved && (
        <p className="mb-4 text-sm text-lime-200">
          Matter id:{" "}
          <Link
            href={`/dash/matter/${matterIdSaved}`}
            className="font-mono text-lime-300 underline-offset-2 hover:underline"
          >
            {matterIdSaved}
          </Link>
        </p>
      )}
      {savedLinks && savedLinks.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="mb-2 font-semibold text-stone-100">Saved on server</h3>
          <ul className="space-y-2 text-sm">
            {savedLinks.map((href, i) => (
              <li key={i}>
                <a
                  className="text-lime-400 underline-offset-2 hover:underline"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {href}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

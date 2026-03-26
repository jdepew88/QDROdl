"use client";

import { useIntake } from "../_state/useIntake";
import {
  pickTemplateForPlan,
  TEMPLATE_FILES,
} from "@/data/templates";
import { useState } from "react";

export default function ReviewStep() {
  const s = useIntake();
  const [format, setFormat] = useState<"docx" | "pdf">("docx");
  const [delivery, setDelivery] = useState<"download" | "save">("download");
  const [saving, setSaving] = useState(false);
  const [savedLinks, setSavedLinks] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [matterIdSaved, setMatterIdSaved] = useState<string | null>(null);

  const templateIds = (s.planAnswers || []).flatMap(
    (ans) =>
      pickTemplateForPlan({
        plan: ans.plan,
        isInPayStatus: ans.isInPayStatus,
        usesTimeRule: ans.usesTimeRule,
        laceraOption4: ans.laceraOption4,
      }) || [],
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
          throw new Error(errText || "Failed to generate drafts");
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
          throw new Error(data?.error || "Failed to save drafts");
        }
        setSavedLinks(data.files || []);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">Review & confirm</h1>

      {!canGenerate && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          Word templates are not mapped yet in <code>TEMPLATE_FILES</code> /{" "}
          <code>pickTemplateForPlan</code>. You can still save the intake to the
          database; draft generation will work once template files are added
          under <code>templates/</code>.
        </div>
      )}

      <div className="mb-6 rounded-2xl border p-5">
        <h2 className="mb-2 font-semibold">Templates to generate</h2>
        {fileNames.length === 0 ? (
          <p className="text-gray-600">No templates selected yet.</p>
        ) : (
          <ul className="list-inside list-disc text-gray-800">
            {fileNames.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6 grid gap-4 rounded-2xl border p-5 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Format</label>
          <select
            className="w-full rounded-lg border p-3"
            value={format}
            onChange={(e) => setFormat(e.target.value as "docx" | "pdf")}
            disabled={!canGenerate}
          >
            <option value="docx">DOCX</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">Delivery</label>
          <select
            className="w-full rounded-lg border p-3"
            value={delivery}
            onChange={(e) =>
              setDelivery(e.target.value as "download" | "save")
            }
            disabled={!canGenerate}
          >
            <option value="download">Download now (ZIP)</option>
            <option value="save">Save to /documents (dated drafts)</option>
          </select>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <button
            type="button"
            onClick={generate}
            disabled={saving || !canGenerate}
            className="w-full rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
          >
            {saving && canGenerate ? "Working…" : "Generate drafts"}
          </button>
          <button
            type="button"
            onClick={submitIntakeOnly}
            disabled={saving}
            className="w-full rounded-xl border border-zinc-400 px-6 py-3 text-zinc-900 disabled:opacity-50"
          >
            Save intake only
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {matterIdSaved && (
        <p className="mb-4 text-sm text-green-800">
          Intake saved. Matter id:{" "}
          <span className="font-mono">{matterIdSaved}</span>
        </p>
      )}
      {savedLinks && (
        <div className="rounded-2xl border p-5">
          <h3 className="mb-2 font-semibold">Saved drafts</h3>
          <ul className="list-inside list-disc">
            {savedLinks.map((href, i) => (
              <li key={i}>
                <a
                  className="text-blue-700 underline"
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

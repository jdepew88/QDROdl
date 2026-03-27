"use client";

import { useRouter } from "next/navigation";
import { useIntake } from "../_state/useIntake";
import type { County } from "@/data/templates";

const COUNTY_OPTIONS: County[] = [
  "Los Angeles",
  "Orange",
  "Ventura",
  "San Bernardino",
  "San Diego",
  "Other",
];

export default function CaseStep() {
  const r = useRouter();
  const { caseInfo, set } = useIntake();
  const onChange = (k: keyof typeof caseInfo, v: any) =>
    set({ caseInfo: { ...caseInfo, [k]: v } });

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-stone-50">Step 3: Case information</h1>
      <p className="mb-6 text-zinc-300">Last step before review. Confirm filing details and dates.</p>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <input
          className="w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Court Case Number"
          value={caseInfo.caseNumber}
          onChange={(e) => onChange("caseNumber", e.target.value)}
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-zinc-400">County</label>
            <select
              className="w-full rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              value={caseInfo.county}
              onChange={(e) => onChange("county", e.target.value)}
            >
              {COUNTY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {caseInfo.county === "Other" && (
            <input
              className="mt-6 flex-1 rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
              placeholder="Other County"
              value={caseInfo.otherCounty || ""}
              onChange={(e) => onChange("otherCounty", e.target.value)}
            />
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <input type="date" className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50" value={caseInfo.dom} onChange={(e) => onChange("dom", e.target.value)} />
          <input type="date" className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50" value={caseInfo.dos} onChange={(e) => onChange("dos", e.target.value)} />
          <input type="date" className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50" value={caseInfo.doj || ""} onChange={(e) => onChange("doj", e.target.value)} />
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={caseInfo.concurrentWithJudgment}
            onChange={(e) => onChange("concurrentWithJudgment", e.target.checked)}
          />
          QDRO(s) will be filed concurrently with the Judgment
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={() => r.back()} className="rounded-xl border border-white/15 px-5 py-3 text-zinc-200">
          Back
        </button>
        <button onClick={() => r.push("/intake/review")} className="rounded-xl bg-lime-800 px-6 py-3 font-semibold text-white">
          Continue to review
        </button>
      </div>
    </main>
  );
}
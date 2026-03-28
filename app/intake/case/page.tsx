"use client";

import { useRouter } from "next/navigation";
import {
  useIntake,
  type AltPayeeBeneficiaryForm,
} from "../_state/useIntake";
import type { County } from "@/data/templates";
import { NONMEMBER_BENEFICIARY_SLOT_COUNT } from "@/lib/nonmemberBeneficiariesMerge";

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
  const { caseInfo, altpayeeBeneficiaries, set } = useIntake();
  const onChange = (k: keyof typeof caseInfo, v: any) =>
    set({ caseInfo: { ...caseInfo, [k]: v } });

  const updateBeneficiary = (
    index: number,
    field: keyof AltPayeeBeneficiaryForm,
    value: string,
  ) => {
    const next = [...altpayeeBeneficiaries];
    next[index] = { ...next[index], [field]: value };
    set({ altpayeeBeneficiaries: next });
  };

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

        <div className="border-t border-white/10 pt-6 mt-6">
          <h2 className="mb-1 text-lg font-semibold text-stone-50">
            Alternate payee beneficiaries (optional)
          </h2>
          <p className="mb-4 text-sm text-zinc-400">
            For orders such as CalPERS Model B: beneficiaries of the{" "}
            <strong className="text-zinc-300">non-member spouse</strong> (the spouse who is{" "}
            <em>not</em> the plan member). Up to {NONMEMBER_BENEFICIARY_SLOT_COUNT} names; leave
            unused rows blank.
          </p>
          <div className="space-y-6">
            {altpayeeBeneficiaries.map((b, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-zinc-900/40 p-4"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Beneficiary {i + 1}
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
                    placeholder="Full legal name"
                    value={b.fullName}
                    onChange={(e) =>
                      updateBeneficiary(i, "fullName", e.target.value)
                    }
                  />
                  <input
                    className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50 md:col-span-2"
                    placeholder="Relationship to alternate payee (e.g., child, sibling)"
                    value={b.relationship || ""}
                    onChange={(e) =>
                      updateBeneficiary(i, "relationship", e.target.value)
                    }
                  />
                  <input
                    className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                    placeholder="Address line 1"
                    value={b.address1 || ""}
                    onChange={(e) =>
                      updateBeneficiary(i, "address1", e.target.value)
                    }
                  />
                  <input
                    className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
                    placeholder="Address line 2"
                    value={b.address2 || ""}
                    onChange={(e) =>
                      updateBeneficiary(i, "address2", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
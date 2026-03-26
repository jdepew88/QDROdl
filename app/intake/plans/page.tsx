"use client";

import { useRouter } from "next/navigation";
import { useIntake } from "../_state/useIntake";
import type { PlanKey } from "@/data/templates";

const PLAN_OPTIONS: { key: PlanKey; label: string }[] = [
  { key: "calpers", label: "CalPERS" },
  { key: "calstrs", label: "CalSTRS" },
  { key: "lacera", label: "LACERA" },
  {
    key: "la_457",
    label: "County of LA Deferred Comp (457)",
  },
  {
    key: "mpi_pension",
    label: "Motion Picture Industry Pension (DB)",
  },
  {
    key: "mpi_iap",
    label: "Motion Picture Industry IAP (DC)",
  },
  { key: "federal", label: "Federal (FERS / CSRS / TSP)" },
  { key: "generic_dc", label: "Generic defined contribution (401k/403b/etc.)" },
];

export default function PlansStep() {
  const r = useRouter();
  const { plans, set } = useIntake();

  const toggle = (k: PlanKey) =>
    set({
      plans: plans.includes(k) ? plans.filter((p) => p !== k) : [...plans, k],
    });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Select retirement plans</h1>
      <p className="mb-4 text-gray-700">You can select multiple plans.</p>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {PLAN_OPTIONS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => toggle(p.key)}
            className={`rounded-2xl border p-5 text-left ${
              plans.includes(p.key) ? "border-black" : "border-gray-300"
            }`}
          >
            <div className="font-semibold">{p.label}</div>
            <div className="text-sm text-gray-600">{p.key}</div>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => r.push("/intake/plan-questions")}
        className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
        disabled={plans.length === 0}
      >
        Continue
      </button>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useIntake } from "@/app/intake/_state/useIntake";
import { INTAKE_PLAN_OPTIONS } from "@/data/intakePlanOptions";
import type { PlanKey } from "@/data/templates";

type Props = {
  title: string;
  description: string;
  continueLabel?: string;
  continueTo?: string;
  className?: string;
};

export default function DroPlanPicker({
  title,
  description,
  continueLabel = "Continue",
  continueTo = "/intake/case",
  className = "",
}: Props) {
  const router = useRouter();
  const { set } = useIntake();

  const [droCount, setDroCount] = useState(1);
  const [selections, setSelections] = useState<(PlanKey | "")[]>([""]);

  const options = useMemo(
    () =>
      INTAKE_PLAN_OPTIONS.map((opt) => (
        <option key={opt.key} value={opt.key}>
          {opt.label}
        </option>
      )),
    [],
  );

  const onCountChange = (count: number) => {
    setDroCount(count);
    setSelections((prev) => {
      const next = [...prev];
      while (next.length < count) next.push("");
      return next.slice(0, count);
    });
  };

  const onPick = (idx: number, value: string) => {
    setSelections((prev) => prev.map((p, i) => (i === idx ? (value as PlanKey | "") : p)));
  };

  const validSelections = selections.filter(Boolean) as PlanKey[];
  const uniqueCount = new Set(validSelections).size;
  const isComplete = validSelections.length === droCount;
  const hasDupes = uniqueCount !== validSelections.length;
  const canContinue = isComplete && !hasDupes;

  const onContinue = () => {
    if (!canContinue) return;
    set({
      plans: validSelections,
      planAnswers: validSelections.map((plan) => ({ plan })),
    });
    router.push(continueTo);
  };

  return (
    <section className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-stone-50">{title}</h2>
      <p className="mt-2 text-sm text-zinc-300">{description}</p>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-zinc-300">How many DROs do you need?</label>
        <select
          value={droCount}
          onChange={(e) => onCountChange(Number(e.target.value))}
          className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-stone-50 outline-none ring-lime-700/40 focus:ring-2 md:max-w-xs"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "DRO" : "DROs"}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {Array.from({ length: droCount }).map((_, idx) => (
          <div key={idx}>
            <label className="mb-2 block text-sm text-zinc-300">Plan for DRO {idx + 1}</label>
            <select
              value={selections[idx] || ""}
              onChange={(e) => onPick(idx, e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-stone-50 outline-none ring-lime-700/40 focus:ring-2"
            >
              <option value="">Select a plan</option>
              {options}
            </select>
          </div>
        ))}
      </div>

      {hasDupes && (
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
          Each DRO should use a different plan selection.
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="rounded-xl bg-lime-800 px-5 py-3 text-sm font-semibold text-stone-50 hover:bg-lime-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {continueLabel}
        </button>
        <Link href="/login" className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline">
          Sign in / create login
        </Link>
      </div>
    </section>
  );
}


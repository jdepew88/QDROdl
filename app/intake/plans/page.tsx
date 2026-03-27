"use client";

import DroPlanPicker from "@/components/intake/DroPlanPicker";

export default function PlansStep() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-3 text-3xl font-bold text-stone-50">Start your intake</h1>
      <p className="mb-6 max-w-2xl text-zinc-300">
        First choose how many DROs you need and the plans to be divided. Then we will collect party,
        attorney, and case information.
      </p>

      <DroPlanPicker
        title="Select plans to divide"
        description="Use dropdowns instead of clickable plan tiles. This makes multi-plan selection faster and clearer."
        continueLabel="Continue to parties"
        continueTo="/intake/parties"
      />
    </main>
  );
}

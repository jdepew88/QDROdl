"use client";

import DroPlanPicker from "@/components/intake/DroPlanPicker";

export default function PlansStep() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-3 text-3xl font-bold text-stone-50">Start your intake</h1>
      <p className="mb-6 max-w-2xl text-zinc-300">
        Choose plans first, then case details, parties, attorneys (if not in pro
        per), plan-specific questions, and review to generate drafts.
      </p>

      <DroPlanPicker
        title="Select plans to divide"
        description="Use dropdowns instead of clickable plan tiles. This makes multi-plan selection faster and clearer."
        continueLabel="Continue to case information"
        continueTo="/intake/case"
      />
    </main>
  );
}

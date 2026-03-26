"use client";

import Link from "next/link";

export default function LacersPlanPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        LACERS
      </p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">
        Los Angeles City Employees' Retirement System
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-600">
        Placeholder page for LACERS-specific QDRO workflows. We will expand this
        page with plan language options, benefit-division models, and intake
        prompts tailored to LACERS administrator requirements.
      </p>
      <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm text-sky-950">
        This temporary page is live so LACERS appears in Plans navigation and
        can be linked from Services and all-plans while full content is finalized.
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/intake/plans"
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Start intake
        </Link>
        <Link
          href="/all_plans"
          className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
        >
          All plans
        </Link>
      </div>
    </main>
  );
}


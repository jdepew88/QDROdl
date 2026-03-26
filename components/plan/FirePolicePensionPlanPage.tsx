"use client";

import Link from "next/link";

export default function FirePolicePensionPlanPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        LAFPP
      </p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">
        Los Angeles Fire and Police Pension
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-600">
        Placeholder page for Los Angeles Fire and Police Pension benefit
        division guidance. We will add service-specific retirement factors,
        survivor benefit options, and administrator-approved order structure.
      </p>
      <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-950">
        Temporary page to support navigation and routing while LAFPP-specific
        drafting workflows are being built.
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


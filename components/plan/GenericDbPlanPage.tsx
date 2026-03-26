"use client";

import Link from "next/link";

export default function GenericDbPlanPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        Defined benefit
      </p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">
        Generic defined benefit plans (pensions)
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-600">
        These are traditional <strong>pension</strong> plans—benefits are
        usually expressed as a monthly payment based on a formula (service,
        compensation, and age), not an individual account balance like a 401(k).
      </p>
      <div className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 p-5 text-sm text-violet-950">
        This page is a placeholder while we add plan-specific models and intake
        questions for additional defined benefit systems beyond the named guides
        (CalPERS, CalSTRS, LACERA, MPI pension, etc.).
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

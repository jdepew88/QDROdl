"use client";

import Link from "next/link";

export default function CityLa457PlanPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        City of LA 457
      </p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">
        City of Los Angeles Deferred Compensation
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-600">
        Placeholder page for City of Los Angeles deferred compensation plan
        division guidance. This will be expanded with plan-specific order terms,
        distribution options, and administrator processing details.
      </p>
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
        Temporary page to support live routing from Plans navigation, Services,
        and all-plans until full City LA deferred comp content is published.
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


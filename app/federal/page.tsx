"use client";

import Link from "next/link";

export default function FederalPlansPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        Federal retirement
      </p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">
        FERS, CSRS, and TSP
      </h1>
      <p className="mt-4 text-zinc-600 leading-relaxed">
        Federal benefit divisions often involve separate orders or elections
        across FERS/CSRS annuities and the Thrift Savings Plan. QDROdl is
        building guided workflows and model language aligned with federal plan
        rules—this section will expand as those templates go live.
      </p>
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
        This page is a placeholder while federal models are finalized. Use
        intake to capture case details; document generation for federal plans
        will connect here in a backend milestone.
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/intake/plans"
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Start intake
        </Link>
        <Link
          href="/plans"
          className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
        >
          All plans
        </Link>
      </div>
    </main>
  );
}

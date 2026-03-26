"use client";

import Link from "next/link";
import { PLAN_ROUTE_ENTRIES, planPath } from "@/data/planRoutes";

export default function AllPlansClient() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-zinc-900">Plans we support</h1>
      <p className="mb-10 max-w-2xl text-zinc-600">
        Guides and intake paths for the retirement systems QDROdl focuses on.
        Start the questionnaire when you’re ready—we’ll route questions based on
        the plans you select.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {PLAN_ROUTE_ENTRIES.map((p) => (
          <li key={p.slug}>
            <Link
              href={planPath(p.slug)}
              className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400 hover:shadow-md"
            >
              <span className="text-lg font-semibold text-zinc-900">
                {p.documentTitle}
              </span>
              <span className="mt-1 block text-sm text-zinc-600">
                {p.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        <Link
          href="/intake/plans"
          className="font-medium text-lime-800 underline-offset-4 hover:underline"
        >
          Begin intake — select plans
        </Link>
      </p>
    </main>
  );
}

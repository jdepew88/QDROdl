"use client";

import Link from "next/link";
import { PLAN_ROUTE_ENTRIES, planPath } from "@/data/planRoutes";

export default function AllPlansClient() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(1200px_circle_at_0%_0%,rgba(59,130,246,0.18),transparent_50%),radial-gradient(900px_circle_at_100%_0%,rgba(132,204,22,0.14),transparent_55%)] p-8 md:p-10"
        aria-labelledby="all-plans-heading"
      >
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Plans
          </p>
          <h1
            id="all-plans-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-stone-50 md:text-4xl"
          >
            Plans we support
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300">
            Guides and intake paths for the retirement systems QDROdl focuses on.
            Start the questionnaire when you&apos;re ready—we&apos;ll route questions
            based on the plans you select.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/intake/plans"
              className="inline-flex rounded-xl bg-lime-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-lime-950/30 transition hover:bg-lime-700"
            >
              Begin intake — select plans
            </Link>
            <Link
              href="/dash/process"
              className="text-sm font-medium text-zinc-400 underline-offset-4 transition hover:text-lime-300 hover:underline"
            >
              View process overview
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="plan-grid-label">
        <div className="mb-6 flex flex-col gap-1 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="plan-grid-label"
              className="text-lg font-semibold text-stone-50"
            >
              Browse by system
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {PLAN_ROUTE_ENTRIES.length} guides — same structure for each plan
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {PLAN_ROUTE_ENTRIES.map((p) => (
            <li key={p.slug} className="min-h-0">
              <Link
                href={planPath(p.slug)}
                className="group relative flex h-full min-h-[9.5rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:border-lime-500/35 hover:bg-white/[0.07]"
              >
                <span
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-500/40 to-transparent opacity-0 transition duration-200 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lime-400/90">
                    {p.navLabel}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-stone-50 group-hover:text-white">
                    {p.documentTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-lime-400/80 transition group-hover:text-lime-300">
                    Open guide
                    <span
                      className="translate-x-0 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-white/10 bg-zinc-950/60 p-8 text-center">
        <p className="text-sm font-medium text-stone-200">
          Not sure which plan applies?
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          You can select multiple plans in intake; we&apos;ll only ask questions
          relevant to your choices.
        </p>
        <Link
          href="/intake/plans"
          className="mt-6 inline-flex rounded-xl border border-lime-600/50 bg-lime-950/40 px-5 py-3 text-sm font-semibold text-lime-100 transition hover:bg-lime-900/50"
        >
          Start intake
        </Link>
      </section>
    </main>
  );
}

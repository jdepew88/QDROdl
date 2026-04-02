"use client";

import Link from "next/link";

/**
 * LAFPP — City of Los Angeles Fire and Police Pensions.
 * Official member materials reference dissolution and benefit assignment (lafpp.lacity.gov).
 */
export default function FirePolicePensionPlanPage() {
  return (
    <div>
      <p className="sr-only">
        Guide to dividing Los Angeles Fire and Police Pension Plan benefits in
        divorce using court orders that meet plan requirements.
      </p>
      <main className="mb-52 min-h-screen bg-zinc-950">
        <section className="bg-[linear-gradient(135deg,rgba(239,68,68,0.1),rgba(59,130,246,0.12))] px-6 py-16 text-center">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-300/90">
              Los Angeles City
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white max-md:text-3xl md:text-5xl md:leading-tight">
              Fire &amp; Police Pensions (LAFPP) division guide
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-lg leading-relaxed text-zinc-300 md:text-xl">
              Defined-benefit retirement for sworn LAFD and LAPD members—community
              property, court orders, and what to expect when a marriage ends.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 max-sm:flex-col max-sm:items-center">
              <span className="rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-200">
                Public safety pension
              </span>
              <span className="rounded-lg border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
                Defined benefit
              </span>
              <span className="rounded-lg border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-semibold text-lime-300">
                City of Los Angeles
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-0">
          <section className="mb-20 mt-16 grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                What LAFPP is
              </h2>
              <p className="mb-4 text-base leading-relaxed text-zinc-300">
                The <strong className="text-stone-200">Los Angeles Fire and Police Pension Plan (LAFPP)</strong>{" "}
                provides <strong className="text-stone-200">retirement allowances and related benefits</strong> for
                eligible <strong className="text-stone-200">sworn</strong> City of Los Angeles{" "}
                <strong className="text-stone-200">fire and police</strong> members under City ordinances and plan
                rules. It is a <strong className="text-stone-200">defined benefit</strong> system (monthly pension
                based on formula and service), not an individual 401(k)-style account balance.
              </p>
              <p className="text-base leading-relaxed text-zinc-300">
                LAFPP publishes member-facing information on{" "}
                <strong className="text-stone-200">marriage dissolution</strong>, including how{" "}
                <strong className="text-stone-200">community property</strong> may apply and how{" "}
                <strong className="text-stone-200">benefits may be assigned</strong> to a former spouse. Use{" "}
                <a
                  href="https://lafpp.lacity.gov"
                  className="font-medium text-lime-400 underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  lafpp.lacity.gov
                </a>{" "}
                for official forms, FAQs, and contact information—procedures and phone numbers can change.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-lg font-semibold text-white">
                Community property snapshot
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Under California law, retirement benefits <strong className="text-zinc-300">earned during marriage</strong>{" "}
                (commonly from marriage through separation) are generally part of the community estate unless the
                parties agree otherwise. The <strong className="text-zinc-300">judgment</strong> should spell out the
                division; the <strong className="text-zinc-300">order sent to LAFPP</strong> must meet plan drafting
                requirements.
              </p>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Court orders and the plan
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-zinc-300">
              <p>
                Implementation is through <strong className="text-stone-200">court orders</strong> that satisfy
                LAFPP&apos;s rules (often described as domestic relations orders or comparable terminology in plan
                materials). The plan may require specific language, formulas, or options for survivor benefits and
                payment timing.
              </p>
              <p>
                <strong className="text-stone-200">Joining LAFPP</strong> to the dissolution case is commonly
                required in California public-pension practice so the court can make orders binding on the plan.
                Whether a <strong className="text-stone-200">joinder</strong> is required in your case depends on
                LAFPP&apos;s instructions and local court rules—see our{" "}
                <Link href="/plan/joinders" className="font-medium text-lime-400 hover:underline">
                  joinders guide
                </Link>
                .
              </p>
              <p>
                Published LAFPP materials discuss dissolution workflows and may reference{" "}
                <strong className="text-stone-200">City Attorney</strong> or other City review steps for certain
                filings. <strong className="text-stone-200">Confirm the current process</strong> with LAFPP member
                services before you file.
              </p>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              DROP and other features
            </h2>
            <p className="text-base leading-relaxed text-zinc-300">
              Members who participate in a <strong className="text-stone-200">Deferred Retirement Option Plan (DROP)</strong>{" "}
              or similar arrangements may have <strong className="text-stone-200">account balances or payment streams</strong>{" "}
              that are also addressed in dissolution. Whether and how DROP is divided depends on your{" "}
              <strong className="text-stone-200">judgment</strong>, <strong className="text-stone-200">marital settlement</strong>, and{" "}
              <strong className="text-stone-200">LAFPP rules</strong> in effect at the time—use LAFPP&apos;s published summaries
              and forms as your primary reference.
            </p>
          </section>

          <section className="mb-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <h2 className="mb-4 text-2xl font-bold text-white">Disclaimer</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              This page is general educational information, not legal advice. LAFPP rules, forms, and city procedures
              change. Work with qualified counsel and confirm requirements directly with LAFPP.
            </p>
          </section>

          <section className="rounded-3xl border border-blue-500/25 bg-blue-950/20 p-10 text-center md:p-14">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Use QDROdl for supported drafting
            </h2>
            <p className="mx-auto mb-8 max-w-[640px] text-base text-zinc-300">
              When LAFPP is in scope for your product roadmap, select it during intake so your answers map to the
              correct templates. If you are unsure which City plan applies, start with{" "}
              <strong className="text-stone-200">plan selection</strong> and your attorney&apos;s direction.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/intake/plans"
                className="inline-flex rounded-xl bg-lime-700 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-lime-600"
              >
                Start intake
              </Link>
              <Link
                href="/all_plans"
                className="inline-flex rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-stone-100 transition hover:bg-white/10"
              >
                All plans
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

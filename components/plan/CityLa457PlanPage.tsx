"use client";

import Link from "next/link";

/**
 * City of Los Angeles Deferred Compensation — governmental 457(b)-type program.
 * Official program materials: https://457.lacity.gov (City of Los Angeles).
 * LACERS administers City pension; deferred comp is a separate program (see lacers.org notes on DCP).
 */
export default function CityLa457PlanPage() {
  return (
    <div>
      <p className="sr-only">
        Guide to dividing City of Los Angeles deferred compensation benefits in
        divorce using plan-appropriate domestic relations orders.
      </p>
      <main className="mb-52 min-h-screen bg-zinc-950">
        <section className="bg-[linear-gradient(135deg,rgba(14,165,233,0.12),rgba(245,158,11,0.1))] px-6 py-16 text-center">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-400/90">
              City of Los Angeles
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white max-md:text-3xl md:text-5xl md:leading-tight">
              Deferred compensation (457) division guide
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-lg leading-relaxed text-zinc-300 md:text-xl">
              How alternate-payee orders typically work for the City&apos;s
              supplemental deferred compensation program—not the same as your
              LACERS pension benefit.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 max-sm:flex-col max-sm:items-center">
              <span className="rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300">
                Governmental 457(b)-type plan
              </span>
              <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200">
                Account-based / DC rules
              </span>
              <span className="rounded-lg border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-semibold text-lime-300">
                Separate from LACERS pension
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-0">
          <section className="mb-20 mt-16 grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                What this plan is
              </h2>
              <p className="mb-4 text-base leading-relaxed text-zinc-300">
                The <strong className="text-stone-200">City of Los Angeles Deferred Compensation Plan</strong>{" "}
                is a <strong className="text-stone-200">supplemental retirement savings</strong> program
                for eligible City employees, commonly structured as a{" "}
                <strong className="text-stone-200">governmental section 457(b)</strong> arrangement.
                It is <strong className="text-stone-200">not</strong> the same thing as your{" "}
                <strong className="text-stone-200">LACERS pension allowance</strong>—pension and deferred
                comp are separate benefits with separate administrators and plan documents.
              </p>
              <p className="text-base leading-relaxed text-zinc-300">
                Governance, disclosures, and member resources for the deferred compensation program are
                published by the City (e.g.{" "}
                <a
                  href="https://457.lacity.gov"
                  className="font-medium text-lime-400 underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  457.lacity.gov
                </a>
                ). Always use the <strong className="text-stone-200">current plan document, SPD, and plan forms</strong>{" "}
                when drafting or reviewing an order.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-lg font-semibold text-white">
                Why the distinction matters
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Orders must match the <strong className="text-zinc-300">correct plan</strong>. A
                judgment that only mentions “LACERS” may not be enough to divide deferred compensation
                accounts if the DCP is a separate legal plan. Your domestic relations order should name
                the plan and follow the administrator&apos;s instructions.
              </p>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Divorce and domestic relations orders
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-zinc-300">
              <p>
                Governmental plans are <strong className="text-stone-200">not governed by ERISA</strong> the
                same way as a typical private-sector 401(k). That said,{" "}
                <strong className="text-stone-200">federal tax rules</strong> still govern tax-deferred
                accounts, rollovers, and when benefits may be paid to an{" "}
                <strong className="text-stone-200">alternate payee</strong>. Your order should be written so
                the plan can administer it without violating tax qualification or plan terms.
              </p>
              <p>
                Division is usually expressed as a <strong className="text-stone-200">percentage or fraction</strong>{" "}
                of the account, or sometimes a <strong className="text-stone-200">specified dollar</strong> amount,
                subject to vesting, loans, investment gains/losses, and the plan&apos;s valuation date rules.
              </p>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Practical checklist
            </h2>
            <ul className="space-y-4 text-base leading-relaxed text-zinc-300">
              <li className="flex gap-3">
                <span className="text-lime-400" aria-hidden>
                  ✓
                </span>
                <span>
                  <strong className="text-stone-200">Identify the exact plan name</strong> and obtain the
                  plan&apos;s model order or checklist, if offered.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400" aria-hidden>
                  ✓
                </span>
                <span>
                  <strong className="text-stone-200">Confirm vesting</strong> and whether any portion of the
                  account is not assignable under the plan.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400" aria-hidden>
                  ✓
                </span>
                <span>
                  <strong className="text-stone-200">Address outstanding loans</strong> if they affect the
                  account balance the plan will split.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400" aria-hidden>
                  ✓
                </span>
                <span>
                  <strong className="text-stone-200">Ask whether pre-approval</strong> of a draft order is
                  required before final court filing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-lime-400" aria-hidden>
                  ✓
                </span>
                <span>
                  <strong className="text-stone-200">Joinder:</strong> many defined contribution plans (including
                  many 457(b) programs) <strong className="text-stone-200">do not</strong> require a joinder;
                  confirm with this plan and your court&apos;s local rules—see our{" "}
                  <Link href="/plan/joinders" className="font-medium text-lime-400 hover:underline">
                    joinders guide
                  </Link>
                  .
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <h2 className="mb-4 text-2xl font-bold text-white">Disclaimer</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              This page is general educational information, not legal or tax advice. Plans, forms, and
              procedures change. Confirm all requirements with the plan administrator, your attorney, and
              the court.
            </p>
          </section>

          <section className="rounded-3xl border border-sky-500/25 bg-sky-950/20 p-10 text-center md:p-14">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to start your intake?
            </h2>
            <p className="mx-auto mb-8 max-w-[640px] text-base text-zinc-300">
              QDROdl walks you through plan selection and generates plan-aware draft language for
              supported systems. In intake, choose the option that matches{" "}
              <strong className="text-stone-200">your employer&apos;s deferred compensation program</strong>{" "}
              (City vs County differs—confirm with counsel).
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

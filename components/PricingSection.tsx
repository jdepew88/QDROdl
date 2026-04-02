"use client";

import Link from "next/link";
import React from "react";

/** First plan order; each additional order in the same matter is $100 off. */
const QDRO_PREP_FIRST = "$595";
const QDRO_PREP_ADDITIONAL = "$495";

export default function PricingSection() {
  return (
    <section id="pricing" className="border-t border-white/10 bg-stone-950 py-20 md:py-24">
      <div className="mx-auto max-w-screen-lg px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-50 md:text-4xl">
          Transparent pricing
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-zinc-400">
          <span className="text-zinc-500">Traditional attorney-drafted QDROs: </span>
          <span className="font-medium text-zinc-300">$1,500–$3,000+</span>
        </p>

        <div className="mx-auto mt-12 max-w-xl">
          <div className="relative rounded-2xl border border-lime-500/35 bg-lime-950/15 p-8 shadow-[0_0_48px_-16px_rgba(132,204,22,0.25)] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-lime-400/90">
              QDRO preparation
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-stone-50 md:text-6xl">
              {QDRO_PREP_FIRST}
            </p>
            <p className="mt-2 text-sm font-medium text-lime-200/90">
              {QDRO_PREP_ADDITIONAL} each additional plan order in the same matter
              <span className="font-normal text-zinc-400"> ($100 off)</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              One price for plan-aware draft generation through our intake—you
              download your package when it&apos;s ready.{" "}
              <strong className="text-stone-200">
                The platform can produce your drafts in moments
              </strong>
              ; we don&apos;t sell fake &quot;speed tiers&quot; because{" "}
              <strong className="text-stone-200">
                plan administrators and courts set their own timelines
              </strong>
              , and no fee changes how fast they review or file.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-zinc-400">
              <li className="flex gap-2">
                <span className="text-lime-500" aria-hidden>
                  ✓
                </span>
                <span>Guided intake and plan-specific draft output</span>
              </li>
              <li className="flex gap-2">
                <span className="text-lime-500" aria-hidden>
                  ✓
                </span>
                <span>No hourly billing—this is the prep fee</span>
              </li>
              <li className="flex gap-2">
                <span className="text-lime-500" aria-hidden>
                  ✓
                </span>
                <span>Filing fees, service, and plan-side processing are separate</span>
              </li>
            </ul>
            <Link
              href="/intake/plans"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-lime-700 px-4 py-3.5 text-center text-sm font-semibold text-white no-underline transition hover:bg-lime-600"
            >
              Start Your QDRO
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-sm font-medium text-zinc-300">
          No hourly billing. No hidden fees.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-zinc-500">
          <span className="font-semibold text-zinc-400">Joinders: </span>
          We provide joinder preparation{" "}
          <strong className="text-zinc-400">only when required</strong> by your
          plan administrator or court procedure—not as a default add-on. Where
          that fits in your matter, timing, and pricing are covered in the{" "}
          <Link
            href="/get-started"
            className="text-lime-400/90 underline-offset-2 hover:underline"
          >
            QDRO prep process
          </Link>{" "}
          and in the{" "}
          <a href="#faq" className="text-lime-400/90 underline-offset-2 hover:underline">
            FAQ
          </a>
          .
        </p>
        <p className="mx-auto mt-2 max-w-xl text-center text-xs text-zinc-500">
          Extra plans or special scope are confirmed at intake before you pay.
        </p>
      </div>
    </section>
  );
}

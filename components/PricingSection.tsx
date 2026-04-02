"use client";

import Link from "next/link";
import React from "react";

const tiers = [
  {
    name: "Standard",
    price: "$595",
    blurb: "Our core turnaround for typical filings.",
    featured: false,
  },
  {
    name: "Expedited",
    price: "$895",
    blurb: "Faster queue when you are up against a deadline.",
    featured: true,
  },
  {
    name: "Rush",
    price: "$1,295",
    blurb: "Priority handling for urgent matters.",
    featured: false,
  },
];

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

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.featured
                  ? "border-lime-500/40 bg-lime-950/20 shadow-[0_0_40px_-12px_rgba(132,204,22,0.35)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lime-400 px-3 py-0.5 text-xs font-semibold text-zinc-950">
                  Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-stone-50">{tier.name}</h3>
              <p className="mt-3 text-4xl font-bold text-stone-50">{tier.price}</p>
              <p className="mt-3 flex-1 text-sm text-zinc-400">{tier.blurb}</p>
              <Link
                href="/intake/plans"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-semibold no-underline transition ${
                  tier.featured
                    ? "bg-lime-700 text-white hover:bg-lime-600"
                    : "border border-white/15 bg-white/5 text-stone-50 hover:bg-white/10"
                }`}
              >
                Start Your QDRO
              </Link>
            </div>
          ))}
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

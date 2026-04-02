import React from "react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="border-t border-white/10 py-20 text-center md:py-24">
      <div className="mx-auto max-w-screen-lg px-6">
        <h2 className="text-3xl font-bold tracking-tight text-stone-50 md:text-4xl">
          Get your QDRO done—without the delays
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          Guided questions, plan-aware drafts, and downloads you can file on your
          schedule.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/intake/plans"
            className="inline-flex rounded-xl bg-lime-800 px-8 py-4 text-base font-semibold text-stone-50 no-underline shadow-lg shadow-lime-950/30 transition hover:bg-lime-700"
          >
            Start Your QDRO
          </Link>
          <Link
            href="/all_plans"
            className="inline-flex rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-stone-50 no-underline transition hover:bg-white/10"
          >
            See supported plans
          </Link>
        </div>
      </div>
    </section>
  );
}

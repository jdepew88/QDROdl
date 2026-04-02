import React from "react";

const steps = [
  {
    n: "1",
    title: "Answer a few guided questions",
    body: "We walk you through your plan, key dates, and the parties—so nothing important gets skipped.",
  },
  {
    n: "2",
    title: "We generate your order",
    body: "Drafts use plan-specific language and rules—not a one-size-fits-all template.",
  },
  {
    n: "3",
    title: "File with the court",
    body: "Download your package when it is ready and submit it on your timeline with your court's procedures.",
  },
];

export default function HowItWorksHomeSection() {
  return (
    <section className="py-20 md:py-24" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-screen-lg px-6">
        <h2
          id="how-it-works-heading"
          className="text-center text-3xl font-bold tracking-tight text-stone-50 md:text-4xl"
        >
          How it works
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 pt-8"
            >
              <span
                className="absolute left-6 top-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-lime-500/40 bg-lime-950/80 text-sm font-bold text-lime-300"
                aria-hidden
              >
                {s.n}
              </span>
              <h3 className="text-lg font-semibold text-stone-50">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

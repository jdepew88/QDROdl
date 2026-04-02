import React from "react";

const bullets = [
  "Plan-specific templates (not generic forms)",
  "Structured to align with common court and plan expectations",
  "Designed to reduce rejection cycles and unnecessary revisions",
];

export default function TrustCredibilitySection() {
  return (
    <section className="py-20 md:py-24" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-screen-lg px-6">
        <h2
          id="trust-heading"
          className="text-center text-3xl font-bold tracking-tight text-stone-50 md:text-4xl"
        >
          Built for accuracy and compliance
        </h2>
        <ul className="mx-auto mt-10 max-w-xl space-y-4">
          {bullets.map((t) => (
            <li
              key={t}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-zinc-200"
            >
              <span className="text-lime-400" aria-hidden>
                ✓
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

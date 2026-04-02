import React from "react";

const yes = [
  "Individuals handling their own divorce (with a judgment that sets the division)",
  "Attorneys who want faster, plan-aware document prep",
  "Anyone who needs a compliant retirement division order for a plan we support",
];

const no = [
  "Complex litigation requiring custom legal strategy beyond the judgment terms",
  "Cases with ongoing disputes over how benefits should be divided",
];

export default function WhoItsForSection() {
  return (
    <section className="border-t border-white/10 bg-zinc-950 py-20 md:py-24">
      <div className="mx-auto max-w-screen-lg px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-50 md:text-4xl">
          Who this is for
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lime-400/90">
              Good fit
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              {yes.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="shrink-0 text-lime-400" aria-hidden>
                    ✓
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Not for
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
              {no.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="shrink-0 text-zinc-600" aria-hidden>
                    ✕
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

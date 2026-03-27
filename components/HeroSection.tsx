import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(132,204,22,0.15),transparent_58%),radial-gradient(ellipse_90%_70%_at_85%_40%,rgba(59,130,246,0.12),transparent_50%),radial-gradient(ellipse_70%_60%_at_10%_60%,rgba(244,244,245,0.06),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(9,9,11,0)_0%,rgba(9,9,11,0.65)_55%,rgb(9,9,11)_100%)]"
        aria-hidden
      />

      <div className="mx-auto my-0 max-w-screen-lg px-6 text-center">
        <p className="mb-5 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-400">
          <span className="rounded-full border border-lime-500/25 bg-lime-500/10 px-3 py-1 font-medium text-lime-300">
            Guided QDRO prep
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="text-zinc-500 sm:text-zinc-400">
            Built for attorneys and self-represented parties
          </span>
        </p>

        <h1 className="mx-auto mb-5 max-w-[14ch] text-4xl font-[538] leading-[1.08] tracking-tight text-stone-50 sm:max-w-none sm:text-5xl md:text-6xl md:leading-[1.05]">
          Let’s get your retirement order{" "}
          <span className="bg-gradient-to-r from-lime-200 via-stone-100 to-sky-200 bg-clip-text text-transparent">
            done right
          </span>
        </h1>

        <p className="mx-auto mb-3 max-w-xl text-lg leading-relaxed text-zinc-300 md:max-w-2xl md:text-xl">
          Walk through a clear intake, review your details, and download draft
          orders tailored to your plan—without the guesswork.
        </p>
        <p className="mx-auto mb-10 max-w-md text-sm text-zinc-500 md:max-w-lg">
          You stay in control; we help you move faster with structured,
          plan-aware drafting.
        </p>

        <div className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/intake/plans"
            className="inline-flex items-center justify-center rounded-xl border-none bg-lime-800 px-8 py-4 text-base font-semibold text-stone-50 no-underline shadow-[0_0_32px_-8px_rgba(132,204,22,0.55)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-lime-700 hover:shadow-[0_0_40px_-6px_rgba(132,204,22,0.45)] active:scale-[0.98] md:text-lg"
          >
            Start your QDRO
          </Link>
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-stone-50 no-underline backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 md:text-lg"
          >
            How it works
          </Link>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-zinc-400 no-underline transition-colors hover:text-zinc-200 sm:px-6"
          >
            Explore services ↓
          </a>
        </div>

        <ul className="mx-auto flex max-w-2xl flex-col gap-3 text-left sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3">
          {[
            { t: "Step-by-step intake", d: "Fewer missed fields, cleaner orders" },
            { t: "Plan-aware templates", d: "Drafts aligned to common CA plans" },
            { t: "You own the paperwork", d: "Download and file on your timeline" },
          ].map((item) => (
            <li
              key={item.t}
              className="flex min-w-0 flex-1 basis-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:max-w-[220px] sm:flex-col sm:items-center sm:text-center"
            >
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-500/15 text-sm text-lime-400 sm:mt-0"
                aria-hidden
              >
                ✓
              </span>
              <span>
                <span className="block font-medium text-stone-50">{item.t}</span>
                <span className="mt-0.5 block text-xs text-zinc-500">{item.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

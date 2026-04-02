import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(132,204,22,0.15),transparent_58%),radial-gradient(ellipse_90%_70%_at_85%_40%,rgba(59,130,246,0.12),transparent_50%),radial-gradient(ellipse_70%_60%_at_10%_60%,rgba(244,244,245,0.06),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(9,9,11,0)_0%,rgba(9,9,11,0.65)_55%,rgb(9,9,11)_100%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-screen-lg px-6 text-center">
        <p className="mb-5 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-400">
          <span className="rounded-full border border-lime-500/25 bg-lime-500/10 px-3 py-1 font-medium text-lime-300">
            Court-ready drafting
          </span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span className="text-zinc-500 sm:text-zinc-400">
            California retirement plans
          </span>
        </p>

        <h1 className="mx-auto mb-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-stone-50 sm:text-5xl md:text-6xl md:leading-[1.05]">
          Court-ready QDROs for{" "}
          <span className="bg-gradient-to-r from-lime-200 via-stone-100 to-sky-200 bg-clip-text text-transparent">
            California retirement plans
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
          Generate a compliant domestic relations order in minutes—without paying
          $1,500+ in attorney fees.
        </p>

        <div className="mb-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Link
            href="/intake/plans"
            className="inline-flex items-center justify-center rounded-xl border-none bg-lime-800 px-8 py-4 text-base font-semibold text-stone-50 no-underline shadow-[0_0_32px_-8px_rgba(132,204,22,0.55)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-lime-700 hover:shadow-[0_0_40px_-6px_rgba(132,204,22,0.45)] active:scale-[0.98] md:text-lg"
          >
            Start Your QDRO
          </Link>
          <Link
            href="/all_plans"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-stone-50 no-underline backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 md:text-lg"
          >
            See Supported Plans
          </Link>
        </div>

        <p className="text-sm text-zinc-500">
          Designed for CalPERS, CalSTRS, LACERA, and more
        </p>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-40 pb-24 text-center">
      <div className="mx-auto my-0 max-w-screen-lg px-6 py-0">
        <h1 className="mb-6 max-sm:text-4xl text-6xl font-[538] leading-none text-stone-50">
          QDROs Made Fair and Simple
        </h1>
        <p className="mx-auto mb-12 mt-0 max-w-[600px] text-xl text-slate-300 max-sm:text-lg">
          Equitable QDROs made simple. Answer questions, review, and download
          your draft order in minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/intake/plans"
            className="rounded-lg border-none bg-neutral-200 px-8 py-4 text-lg font-[510] text-zinc-950 no-underline"
          >
            Start Your QDRO
          </Link>
          <a
            href="#services"
            className="rounded-lg border border-solid border-white border-opacity-10 bg-zinc-800 px-8 py-4 text-lg font-[510] text-stone-50 no-underline"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

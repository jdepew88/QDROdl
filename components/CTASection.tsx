import React from "react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 text-center">
      <div className="mx-auto my-0 max-w-screen-lg px-6 py-0">
        <h2 className="mb-6 max-sm:text-4xl text-6xl font-[538] leading-none text-stone-50">
          Protect Your Retirement Future <br />
          in Minutes
        </h2>
        <p className="mx-auto mb-12 mt-0 max-w-[600px] text-xl text-slate-300 max-sm:text-lg">
          Don&apos;t let the legalese get in your way. Download your QDRO today.
          Learn, answer questions, and download your QDRO in minutes. At the end
          of the process you&apos;ll be a QDRO expert.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/intake/plans"
            className="rounded-lg border-none bg-green-400 px-8 py-4 text-lg font-[510] text-zinc-950 no-underline"
          >
            Start Your QDRO Now
          </Link>
          <a
            href="#services"
            className="rounded-lg border border-solid border-white border-opacity-10 bg-zinc-800 px-8 py-4 text-lg font-[510] text-stone-50 no-underline"
          >
            Learn more about preparing a QDRO
          </a>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import React from "react";

export function CallToActionSection() {
  return (
    <section
      id="process"
      className="rounded-3xl border border-solid border-blue-400 border-opacity-20 bg-blue-400 bg-opacity-10 p-14 text-center"
    >
      <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
        Need Professional Assistance?
      </h2>
      <p className="mx-auto mb-10 mt-0 max-w-[700px] text-lg leading-relaxed text-zinc-300">
        LACERS pension division is complex and requires specialized expertise.
        QDROdl.app provides guided intake and draft preparation support for
        domestic relations orders involving City of Los Angeles retirement
        benefits.
      </p>
      <div className="flex justify-center gap-5 max-sm:flex-col max-sm:items-center">
        <Link
          href="/intake/plans"
          className="rounded-lg border-none bg-blue-400 px-8 py-4 text-lg font-semibold text-white transition-all duration-[0.2s]"
        >
          Start intake
        </Link>
        <Link
          href="/all_plans"
          className="rounded-lg border-2 border-solid border-zinc-300 border-opacity-30 bg-transparent px-8 py-4 text-lg font-semibold text-zinc-300 transition-all duration-[0.2s]"
        >
          All plans
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";
import React from "react";

export default function CallToActionSection() {
  return (
    <section className="rounded-3xl border border-solid border-blue-400 border-opacity-20 bg-blue-400 bg-opacity-10 p-14 text-center">
      <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
        Need Professional Assistance?
      </h2>
      <p className="mx-auto mt-0 mb-10 max-w-[700px] text-lg leading-relaxed text-zinc-300">
        Motion Picture Industry pension and IAP division requires specialized
        expertise in entertainment industry benefits. Our team provides
        comprehensive support for unified QDRO preparation covering both defined
        benefit and individual account components.
      </p>
      <div className="flex justify-center gap-5 max-sm:flex-col max-sm:items-center">
        <Link
          href="/intake/plans"
          className="rounded-lg bg-blue-400 px-8 py-4 text-lg font-semibold text-white no-underline transition-all duration-[0.2s]"
        >
          Get Expert Help
        </Link>
        <Link
          href="/all_plans"
          className="rounded-lg border-2 border-solid border-zinc-300 border-opacity-30 bg-transparent px-8 py-4 text-lg font-semibold text-zinc-300 no-underline transition-all duration-[0.2s]"
        >
          Download Resources
        </Link>
      </div>
    </section>
  );
}


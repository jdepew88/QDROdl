import Link from "next/link";
import React from "react";

export default function CallToActionSection() {
  return (
    <section className="p-14 text-center rounded-3xl border border-solid bg-blue-400 bg-opacity-10 border-blue-400 border-opacity-20">
      <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
        Need Expert Defined Benefit Plan Division?
      </h2>
      <p className="mx-auto mt-0 mb-10 text-lg leading-relaxed max-w-[700px] text-zinc-300">
        Our team specializes in defined benefit plan division using the time
        rule method. We determine the appropriate plan administrator and prepare
        QDROs that ensure accurate division of pension benefits earned during
        marriage.
      </p>
      <div className="flex gap-5 justify-center max-sm:flex-col max-sm:items-center">
        <Link
          href="/intake/plans"
          className="px-8 py-4 text-lg font-semibold text-white bg-blue-400 rounded-lg transition-all duration-[0.2s] no-underline"
        >
          Get Expert Help
        </Link>
        <Link
          href="/all_plans"
          className="px-8 py-4 text-lg font-semibold bg-transparent rounded-lg border-2 border-solid transition-all border-zinc-300 border-opacity-30 duration-[0.2s] text-zinc-300 no-underline"
        >
          Download Resources
        </Link>
      </div>
    </section>
  );
}


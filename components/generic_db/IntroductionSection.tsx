import React from "react";

export default function IntroductionSection() {
  return (
    <section className="mb-24">
      <div className="mb-16 grid grid-cols-[1fr_1fr] items-center gap-16 max-md:grid-cols-[1fr] max-md:gap-10">
        <div>
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
            Understanding Defined Benefit Plan Division
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            Defined benefit pension plans promise specific monthly payments at
            retirement based on salary and years of service. Unlike
            account-based plans, these require specialized division methods to
            determine the marital portion of future benefits.
          </p>
          <p className="text-lg leading-relaxed text-zinc-300">
            We determine the appropriate plan administrator and prepare QDROs
            using the time rule method to accurately divide pension benefits
            earned during marriage, ensuring proper handling of both current and
            future benefit payments.
          </p>
        </div>
        <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
          <img
            alt="Pension plan documents and calculation tools for QDRO preparation"
            src="https://images.pexels.com/photos/7247413/pexels-photo-7247413.jpeg"
            className="mb-6 h-[280px] w-full overflow-hidden rounded-xl object-cover"
          />
          <h3 className="mb-3 text-xl font-semibold text-white">
            Time Rule Method &amp; Plan Administrator Expertise
          </h3>
          <p className="text-base leading-relaxed text-zinc-300">
            Defined benefit plans require specialized QDRO preparation using the
            time rule method. We identify the correct plan administrator and
            ensure QDROs meet specific plan requirements for successful benefit
            division.
          </p>
        </div>
      </div>
    </section>
  );
}


import React from "react";

export function InfoSection() {
  return (
    <section id="overview" className="mb-24">
      <div className="mb-16 grid grid-cols-[1fr_1fr] items-center gap-16 max-md:grid-cols-[1fr] max-md:gap-10">
        <div>
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
            Understanding LACERS QDRO Options
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            When dividing LACERS retirement benefits during divorce, there are
            multiple approaches available depending on the member&apos;s
            retirement status, benefit type, and the specific circumstances of
            the case.
          </p>
          <p className="text-lg leading-relaxed text-zinc-300">
            Each division method has distinct advantages, requirements, and
            implications for both the member and the former spouse.
            Understanding these options is crucial for making informed decisions
            during divorce proceedings involving Los Angeles City employees.
          </p>
        </div>
        <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
          <img
            alt="Legal documents for retirement benefit division"
            src="https://images.pexels.com/photos/7876051/pexels-photo-7876051.jpeg"
            className="mb-6 h-[280px] w-full overflow-hidden rounded-xl object-cover"
          />
          <h3 className="mb-3 text-xl font-semibold text-white">
            Professional Legal Guidance Required
          </h3>
          <p className="text-base leading-relaxed text-zinc-300">
            LACERS pension division requires specialized knowledge of family law
            and City retirement benefits. Always consult with qualified
            attorneys experienced in LACERS DRO matters and Los Angeles City
            employment benefits.
          </p>
        </div>
      </div>
    </section>
  );
}

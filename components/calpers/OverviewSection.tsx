export function OverviewSection() {
  return (
    <section className="mb-24">
      <div className="grid gap-16 items-center mb-16 grid-cols-[1fr_1fr] max-md:gap-10 max-md:grid-cols-[1fr]">
        <div>
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
            Understanding CalPERS DRO Options
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            When dividing CalPERS retirement benefits during divorce, there are
            three primary models available depending on the member's retirement
            status and the specific circumstances of the case.
          </p>
          <p className="text-lg leading-relaxed text-zinc-300">
            Each model has distinct advantages, requirements, and implications
            for both the member and the former spouse. Understanding these
            options is crucial for making informed decisions during divorce
            proceedings.
          </p>
        </div>
        <div className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20">
          <img
            alt="Legal documents for CalPERS pension division"
            src="https://images.pexels.com/photos/7876051/pexels-photo-7876051.jpeg"
            className="object-cover overflow-hidden mb-6 w-full rounded-xl h-[280px]"
          />
          <h3 className="mb-3 text-xl font-semibold text-white">
            Professional Legal Guidance Required
          </h3>
          <p className="text-base leading-relaxed text-zinc-300">
            CalPERS pension division requires specialized knowledge of family
            law and retirement benefits. Always consult with qualified attorneys
            experienced in CalPERS DRO matters.
          </p>
        </div>
      </div>
    </section>
  );
}

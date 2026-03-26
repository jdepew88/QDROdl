interface IntroductionSectionProps {}

export default function IntroductionSection({}: IntroductionSectionProps) {
  return (
    <section className="mb-24">
      <div className="grid gap-16 items-center mb-16 grid-cols-[1fr_1fr] max-md:gap-10 max-md:grid-cols-[1fr]">
        <div>
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
            Understanding CalSTRS DRO Options
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            When dividing CalSTRS retirement benefits during divorce, there are
            two primary approaches available depending on the member's
            retirement status and the specific circumstances of the case.
          </p>
          <p className="text-lg leading-relaxed text-zinc-300">
            Each approach has distinct advantages, requirements, and
            implications for both the teacher member and the former spouse.
            Understanding these options is crucial for making informed decisions
            during divorce proceedings involving educator pensions.
          </p>
        </div>
        <article className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20">
          <img
            alt="Legal documents for CalSTRS pension division"
            src="https://images.pexels.com/photos/7876051/pexels-photo-7876051.jpeg"
            className="object-cover overflow-hidden mb-6 w-full rounded-xl h-[280px]"
          />
          <h3 className="mb-3 text-xl font-semibold text-white">
            Professional Legal Guidance Required
          </h3>
          <p className="text-base leading-relaxed text-zinc-300">
            CalSTRS pension division requires specialized knowledge of family
            law and teacher retirement benefits. Always consult with qualified
            attorneys experienced in CalSTRS DRO matters.
          </p>
        </article>
      </div>
    </section>
  );
}

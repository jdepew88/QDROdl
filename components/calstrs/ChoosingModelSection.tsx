interface ChoosingModelSectionProps {}

export default function ChoosingModelSection({}: ChoosingModelSectionProps) {
  return (
    <section className="mb-24">
      <h2 className="mb-8 text-4xl font-bold leading-tight text-center text-white">
        Choosing the Right Model
      </h2>
      <p className="mx-auto mt-0 mb-14 text-lg leading-relaxed text-center max-w-[800px] text-zinc-300">
        The choice between these models depends on various factors including the
        member's retirement status, the length of marriage, career stage, and
        the specific goals of both parties.
      </p>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        <article className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20">
          <h3 className="mb-5 text-2xl font-semibold text-white">
            ⚖️ Legal Considerations
          </h3>
          <ul className="pl-5 text-base leading-relaxed text-zinc-300">
            <li className="mb-3">Community property laws in California</li>
            <li className="mb-3">Federal and state pension regulations</li>
            <li className="mb-3">
              CalSTRS-specific requirements and limitations
            </li>
            <li>Tax implications for both parties</li>
          </ul>
        </article>
        <article className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20">
          <h3 className="mb-5 text-2xl font-semibold text-white">
            💰 Financial Factors
          </h3>
          <ul className="pl-5 text-base leading-relaxed text-zinc-300">
            <li className="mb-3">Current and projected benefit values</li>
            <li className="mb-3">
              Impact on both parties' retirement security
            </li>
            <li className="mb-3">Health benefit eligibility and costs</li>
            <li>Survivor benefit considerations</li>
          </ul>
        </article>
        <article className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20">
          <h3 className="mb-5 text-2xl font-semibold text-white">
            📋 Documentation Required
          </h3>
          <ul className="pl-5 text-base leading-relaxed text-zinc-300">
            <li className="mb-3">Certified copy of the DRO</li>
            <li className="mb-3">Certified copy of divorce decree</li>
            <li className="mb-3">CalSTRS DRO transmittal form</li>
            <li>Marriage certificate and other supporting documents</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

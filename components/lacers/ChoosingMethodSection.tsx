import React from "react";

export function ChoosingMethodSection() {
  return (
    <section id="requirements" className="mb-24">
      <h2 className="mb-8 text-center text-4xl font-bold leading-tight text-white">
        Choosing the Right Method
      </h2>
      <p className="mx-auto mb-14 mt-0 max-w-[800px] text-center text-lg leading-relaxed text-zinc-300">
        The choice between these division methods depends on various factors
        including the member&apos;s retirement status, the length of marriage,
        career stage, and the specific financial goals of both parties.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
        <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
          <h3 className="mb-5 text-2xl font-semibold text-white">
            ⚖️ Legal Considerations
          </h3>
          <ul className="pl-5 text-base leading-relaxed text-zinc-300">
            <li className="mb-3">Community property laws in California</li>
            <li className="mb-3">Federal and state pension regulations</li>
            <li className="mb-3">
              LACERS-specific requirements and limitations
            </li>
            <li>Tax implications for both parties</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
          <h3 className="mb-5 text-2xl font-semibold text-white">
            💰 Financial Factors
          </h3>
          <ul className="pl-5 text-base leading-relaxed text-zinc-300">
            <li className="mb-3">Current and projected benefit values</li>
            <li className="mb-3">
              Impact on both parties&apos; retirement security
            </li>
            <li className="mb-3">Health benefit eligibility and costs</li>
            <li>Survivor benefit considerations</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
          <h3 className="mb-5 text-2xl font-semibold text-white">
            📋 Documentation Often Required
          </h3>
          <ul className="pl-5 text-base leading-relaxed text-zinc-300">
            <li className="mb-3">Certified copy of the DRO</li>
            <li className="mb-3">Certified copy of divorce decree</li>
            <li className="mb-3">LACERS DRO transmittal and plan forms</li>
            <li>Marriage certificate and other supporting documents</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

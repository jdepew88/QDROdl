import React from "react";

export default function WhatIsQDROSection() {
  const features = [
    {
      title: "Legal Protection",
      description:
        "Ensures court-ordered division of retirement assets is legally binding and enforceable.",
    },
    {
      title: "Tax Benefits",
      description:
        "Avoids early withdrawal penalties and preserves tax-deferred status of retirement funds.",
    },
    {
      title: "Financial Security",
      description:
        "Protects your rightful share of marital retirement assets for your future security.",
    },
  ];

  return (
    <section className="py-24 bg-stone-950">
      <div className="px-6 py-0 mx-auto my-0 max-w-screen-lg">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-6xl leading-none font-[538] text-stone-50 max-sm:text-4xl">
            What is a QDRO?
          </h2>
          <p className="mx-auto my-0 text-xl max-w-[800px] text-slate-300 max-sm:text-lg">
            A Qualified Domestic Relations Order (QDRO) is a legal document that
            divides retirement plan benefits between divorcing spouses. It's
            essential for protecting your financial future and ensuring proper
            asset distribution.
          </p>
        </div>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border-t border-solid bg-neutral-900 border-t-white border-t-opacity-10"
            >
              <h3 className="mb-4 text-2xl font-[538] text-stone-50">
                {feature.title}
              </h3>
              <p className="text-lg leading-relaxed text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

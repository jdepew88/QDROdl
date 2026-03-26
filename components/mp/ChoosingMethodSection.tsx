import React from "react";

export default function ChoosingMethodSection() {
  const considerations = [
    {
      icon: "⚖️",
      title: "Legal Considerations",
      items: [
        "Entertainment industry employment patterns",
        "ERISA regulations for both plan components",
        "Motion Picture Industry Pension Plan rules",
        "Unified QDRO coordination requirements",
      ],
    },
    {
      icon: "💰",
      title: "Financial Factors",
      items: [
        "Defined benefit pension value vs. IAP account balance",
        "Vesting schedules for both plan components",
        "Entertainment industry career volatility",
        "Coordination of dual benefit streams",
      ],
    },
    {
      icon: "📋",
      title: "Documentation Required",
      items: [
        "Unified QDRO covering both plan components",
        "Certified copy of divorce decree",
        "Motion Picture Industry Plan transmittal forms",
        "Employment verification and earnings history",
      ],
    },
  ];

  return (
    <section className="mb-24">
      <h2 className="mb-8 text-center text-4xl font-bold leading-tight text-white">
        Choosing the Right Method
      </h2>
      <p className="mx-auto mt-0 mb-14 max-w-[800px] text-center text-lg leading-relaxed text-zinc-300">
        The choice between these division methods depends on the participant's
        career stage in the entertainment industry, vesting status in both plan
        components, and whether immediate liquidity or long-term benefit streams
        better serve both parties' needs.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
        {considerations.map((consideration, index) => (
          <div
            key={index}
            className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8"
          >
            <h3 className="mb-5 text-2xl font-semibold text-white">
              {consideration.icon} {consideration.title}
            </h3>
            <ul className="pl-5 text-base leading-relaxed text-zinc-300">
              {consideration.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className={
                    itemIndex < consideration.items.length - 1 ? "mb-3" : ""
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


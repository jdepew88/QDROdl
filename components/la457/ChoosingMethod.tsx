import * as React from "react";

function ChoosingMethod() {
  const considerations = [
    {
      icon: "⚖️",
      title: "Legal Considerations",
      items: [
        "Community property laws in California",
        "Federal and state pension regulations",
        "LACERA-specific requirements and limitations",
        "Tax implications for both parties",
      ],
    },
    {
      icon: "💰",
      title: "Financial Factors",
      items: [
        "Current and projected benefit values",
        "Impact on both parties' retirement security",
        "Health benefit eligibility and costs",
        "Survivor benefit considerations",
      ],
    },
    {
      icon: "📋",
      title: "Documentation Required",
      items: [
        "Certified copy of the DRO",
        "Certified copy of divorce decree",
        "LACERA DRO transmittal form",
        "Marriage certificate and other supporting documents",
      ],
    },
  ];

  return (
    <section className="mb-24">
      <h2 className="mb-8 text-4xl font-bold leading-tight text-center text-white">
        Choosing the Right Method
      </h2>
      <p className="mx-auto mt-0 mb-14 text-lg leading-relaxed text-center max-w-[800px] text-zinc-300">
        The choice between these division methods depends on various factors
        including the member's retirement status, the length of marriage, career
        stage, and the specific financial goals of both parties.
      </p>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        {considerations.map((consideration, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20"
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

export default ChoosingMethod;

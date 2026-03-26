import React from "react";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "⚖️ QDRO Requirements",
      items: [
        "QDRO must meet specific plan administrator requirements",
        "Plan administrator review and approval process required",
        "Different rules for 401(k), 403(b), and TSP divisions",
        "Pre-marriage interests require special handling",
      ],
    },
    {
      title: "💰 Actuarial Analysis",
      items: [
        "Account balance growth attribution analysis",
        "Pre-marriage vs. marital contribution separation",
        "Investment performance allocation methodology",
        "Employer matching contribution analysis",
      ],
    },
    {
      title: "📋 Required Documentation",
      items: [
        "Certified copy of QDRO",
        "Complete account statements from date of marriage",
        "Actuarial report for pre-marriage separate interests",
        "Plan administrator-specific division forms",
      ],
    },
  ];

  return (
    <section className="mb-24">
      <h2 className="mb-8 text-4xl font-bold leading-tight text-center text-white">
        Why Choose Our Defined Benefit Plan Division Services
      </h2>
      <p className="mx-auto mt-0 mb-14 text-lg leading-relaxed text-center max-w-[800px] text-zinc-300">
        Our specialized expertise in defined benefit plan division ensures
        accurate time rule calculations and proper plan administrator
        identification. We prepare QDROs that meet specific plan requirements
        for successful benefit division.
      </p>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20"
          >
            <h3 className="mb-5 text-2xl font-semibold text-white">
              {benefit.title}
            </h3>
            <ul className="pl-5 text-base leading-relaxed text-zinc-300">
              {benefit.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className={itemIndex < benefit.items.length - 1 ? "mb-3" : ""}
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


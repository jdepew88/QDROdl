"use client";
import React, { useState } from "react";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "QDRO/DRO Services",
      price: "$600",
      description: "Professional qualified domestic relations orders",
      features: [
        "First QDRO: $600",
        "Additional QDROs: $500 each",
        "All retirement plan types",
        "Court filing assistance",
        "Plan administrator review",
        "Filing fees extra (TBD)",
        "Most cases use e-signatures & e-filing",
        "Only filing fees typically apply",
      ],
      popular: true,
    },
    {
      name: "Joinder Services",
      price: "$375",
      description: "Required only when mandated by Plan Administrator",
      features: [
        "Joinder preparation: $375",
        "Only when required by Plan Admin",
        "Complements QDRO process",
        "Professional document preparation",
        "Filing fees extra (TBD)",
        "Mailing fees extra (when applicable)",
        "E-filing preferred when available",
        "Streamlined process",
      ],
    },
  ];

  function selectPlan(planName) {
    setSelectedPlan(planName);
  }

  return (
    <section id="pricing" className="py-24 bg-stone-950">
      <div className="px-6 py-0 mx-auto my-0 max-w-screen-lg">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-6xl leading-none font-[538] text-stone-50 max-sm:text-4xl">
            Transparent Pricing
          </h2>
          <p className="mx-auto my-0 text-xl max-w-[600px] text-slate-300 max-sm:text-lg">
            Professional QDRO preparation at competitive rates
          </p>
        </div>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative p-8 rounded-lg transition-transform duration-[0.3s] ease-[ease]"
              style={{
                backgroundColor: plan.popular
                  ? "rgb(25, 26, 27)"
                  : "rgb(20, 21, 22)",
                borderTop: plan.popular
                  ? "2px solid rgb(104, 204, 88)"
                  : "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-2/4 px-4 py-1 text-sm bg-green-400 rounded-2xl -translate-x-2/4 font-[538] text-zinc-950">
                  Most Popular
                </div>
              )}
              <h3 className="mb-2 text-2xl font-[538] text-stone-50">
                {plan.name}
              </h3>
              <div className="mb-2 text-4xl font-[538] text-stone-50">
                {plan.price}
              </div>
              <p className="mb-6 text-base text-neutral-400">
                {plan.description}
              </p>
              <ul className="p-0 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="relative pl-5 mb-3 text-base text-slate-300 before:content-['✓'] before:absolute before:left-0 before:text-green-400"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="p-4 w-full text-base rounded-lg transition-opacity cursor-pointer border-[none] duration-[0.3s] ease-[ease] font-[510]"
                onClick={() => selectPlan(plan.name)}
                style={{
                  backgroundColor: plan.popular
                    ? "rgb(104, 204, 88)"
                    : "rgb(230, 230, 230)",
                  color: plan.popular ? "rgb(8, 9, 10)" : "rgb(8, 9, 10)",
                }}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import DistributionMethod from "./DistributionMethod";

export default function DistributionMethodsSection() {
  const methods = [
    {
      methodNumber: "METHOD 1",
      title: "Immediate Lump Sum Distribution",
      description:
        "The alternate payee receives their awarded portion from both the defined benefit plan (as a lump sum equivalent) and Individual Account Program immediately upon QDRO approval, providing instant access to all awarded benefits.",
      bestFor:
        "Alternate payees who want immediate access to both pension and individual account funds, need liquidity for other investments, or prefer complete financial separation from the entertainment industry participant.",
      features: [
        {
          title: "✓ Immediate Access",
          description:
            "Alternate payee receives funds immediately upon QDRO approval",
        },
        {
          title: "✓ Investment Control",
          description:
            "Full control over investment decisions and distribution timing",
        },
        {
          title: "✓ Clean Financial Break",
          description:
            "Complete separation from participant's account and future decisions",
        },
        {
          title: "✓ Tax Flexibility",
          description:
            "Options for direct rollover to IRA or other qualified plans",
        },
      ],
      considerations: {
        title: "Important Considerations:",
        items: [
          "May trigger immediate tax consequences if not properly rolled over",
          "Requires careful planning to avoid early withdrawal penalties",
          "Alternate payee loses future investment growth potential in original plan",
        ],
      },
      colorScheme: "blue" as const,
    },
    {
      methodNumber: "METHOD 2",
      title: "Shared Interest in Future Benefits",
      description:
        "The alternate payee maintains a shared interest in the participant's future pension benefits and Individual Account Program, receiving their portion when the participant becomes eligible for distribution from each component.",
      bestFor:
        "Alternate payees who want to maintain the full value of future pension benefits, prefer to keep Individual Account Program investments growing, and don't need immediate access to funds.",
      features: [
        {
          title: "✓ Investment Control",
          description:
            "Alternate payee controls their own investment allocation and timing",
        },
        {
          title: "✓ Tax-Deferred Growth",
          description:
            "Maintains tax-deferred status and continued growth potential",
        },
        {
          title: "✓ Plan Investment Options",
          description:
            "Access to LA County's institutional investment options and lower fees",
        },
        {
          title: "✓ Beneficiary Designation",
          description:
            "Alternate payee can designate their own beneficiaries for their account",
        },
      ],
      considerations: {
        title: "Important Requirements:",
        items: [
          "Plan must allow for separate account maintenance:",
          "Alternate payee becomes a plan participant with all associated rights and responsibilities",
        ],
      },
      colorScheme: "violet" as const,
    },
    {
      methodNumber: "METHOD 3",
      title: "Separate Benefit Stream",
      description:
        "The alternate payee receives their own separate monthly pension payments from the defined benefit plan and independent access to their portion of the Individual Account Program, creating two distinct benefit streams.",
      bestFor:
        "Alternate payees who want independent monthly pension income and separate control over Individual Account Program distributions, providing maximum flexibility and autonomy from the participant.",
      features: [
        {
          title: "✓ Continued Growth",
          description: "Funds continue to grow tax-deferred until distribution",
        },
        {
          title: "✓ Distribution Flexibility",
          description:
            "Alternate payee can choose distribution method when eligible",
        },
        {
          title: "✓ Tax Planning Opportunity",
          description:
            "Allows for optimal timing of distributions for tax purposes",
        },
        {
          title: "✓ No Early Withdrawal Risk",
          description:
            "Avoids potential early withdrawal penalties by waiting for eligibility",
        },
      ],
      considerations: {
        title: "Important Considerations:",
        items: [
          "Alternate payee must wait for participant's distribution eligibility",
          "No control over investment decisions while funds remain in participant's account",
          "Distribution timing depends on participant's employment status and plan rules",
        ],
      },
      calculation: {
        title: "Calculation Method:",
        description:
          "Separate benefit calculations are performed for both the defined benefit pension (using actuarial factors) and Individual Account Program (using account values). Each component maintains its own distribution schedule and payment structure.",
      },
      colorScheme: "green" as const,
    },
  ];

  return (
    <section className="mb-24">
      <h2 className="mb-14 text-4xl font-bold leading-tight text-center text-white">
        Motion Picture Industry QDRO Distribution Methods
      </h2>
      <div className="grid grid-cols-[1fr] gap-12">
        {methods.map((method, index) => (
          <DistributionMethod key={index} {...method} />
        ))}
      </div>
    </section>
  );
}


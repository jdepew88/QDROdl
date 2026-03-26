import DistributionMethodCard from "./DistributionMethodCard";

export default function DistributionMethods() {
  const methods = [
    {
      methodNumber: "METHOD 1",
      title: "Immediate Distribution",
      description:
        "The alternate payee receives their awarded portion of the deferred compensation account immediately upon QDRO approval, providing instant access to funds and complete separation from the participant's account.",
      bestFor:
        "Alternate payees who want immediate access to funds, need liquidity for other investments, or prefer a clean financial break from the participant.",
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
      considerations: [
        "May trigger immediate tax consequences if not properly rolled over",
        "Requires careful planning to avoid early withdrawal penalties",
        "Alternate payee loses future investment growth potential in original plan",
      ],
      colorScheme: "blue" as const,
    },
    {
      methodNumber: "METHOD 2",
      title: "Separate Account Maintenance",
      description:
        "Creates a separate deferred compensation account for the alternate payee within the LA County plan, allowing independent investment decisions while maintaining the tax-deferred status of the funds.",
      bestFor:
        "Alternate payees who want to maintain tax-deferred growth, prefer the LA County investment options, and don't need immediate access to funds.",
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
      colorScheme: "violet" as const,
    },
    {
      methodNumber: "METHOD 3",
      title: "Deferred Distribution",
      description:
        "The alternate payee's portion remains in the participant's account until the participant becomes eligible for distribution, at which point the alternate payee can elect their own distribution method.",
      bestFor:
        "Cases where the participant is not yet eligible for distribution, or when the alternate payee prefers to wait for optimal distribution timing and tax planning.",
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
      considerations: [
        "Alternate payee must wait for participant's distribution eligibility",
        "No control over investment decisions while funds remain in participant's account",
        "Distribution timing depends on participant's employment status and plan rules",
      ],
      calculationMethod:
        "The lump sum is calculated using LACERA's actuarial assumptions including life expectancy, interest rates, and benefit formulas. The calculation considers the community property portion of the member's accrued benefit.",
      colorScheme: "green" as const,
    },
  ];

  return (
    <section className="mb-24">
      <h2 className="mb-14 text-4xl font-bold leading-tight text-center text-white">
        Deferred Compensation QDRO Distribution Methods
      </h2>
      <div className="grid gap-12 grid-cols-[1fr]">
        {methods.map((method, index) => (
          <DistributionMethodCard
            key={index}
            methodNumber={method.methodNumber}
            title={method.title}
            description={method.description}
            bestFor={method.bestFor}
            features={method.features}
            considerations={method.considerations}
            calculationMethod={method.calculationMethod}
            colorScheme={method.colorScheme}
          />
        ))}
      </div>
    </section>
  );
}

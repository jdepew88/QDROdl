import React from "react";
import { DivisionMethod } from "./DivisionMethod";

export const MethodsSection: React.FC = () => {
  const sharedInterestFeatures = [
    {
      title: "✓ Proportional Sharing",
      description:
        "Former spouse receives a fixed percentage of the member's monthly benefit",
    },
    {
      title: "✓ COLA Adjustments",
      description:
        "Former spouse receives proportional cost-of-living increases with the member",
    },
    {
      title: "✓ Member Controls Timing",
      description:
        "Member decides when to retire; former spouse receives payments when member retires",
    },
    {
      title: "✓ Survivor Benefits",
      description:
        "Can include survivor benefits for the former spouse if specified in the DRO",
    },
  ];

  const separateInterestFeatures = [
    {
      title: "✓ Independent Control",
      description:
        "Former spouse controls their own retirement timing and benefit options",
    },
    {
      title: "✓ Separate Benefits",
      description:
        "Creates two distinct LACERA accounts with separate benefit calculations",
    },
    {
      title: "✓ Health Benefits Eligibility",
      description:
        "Former spouse may be eligible for LACERA health benefits upon retirement",
    },
    {
      title: "✓ Beneficiary Rights",
      description:
        "Former spouse can designate their own beneficiaries for their account",
    },
  ];

  const lumpSumFeatures = [
    {
      title: "✓ Immediate Payment",
      description:
        "Former spouse receives a one-time lump sum payment upon DRO approval",
    },
    {
      title: "✓ Clean Break",
      description: "Eliminates ongoing financial ties between former spouses",
    },
    {
      title: "✓ Investment Control",
      description:
        "Former spouse can invest the lump sum according to their own financial strategy",
    },
    {
      title: "✓ No Future Dependency",
      description:
        "No dependency on member's future retirement decisions or longevity",
    },
  ];

  const separateInterestAdditionalContent = (
    <div className="p-8 mb-8 text-center rounded-2xl bg-white bg-opacity-10">
      <h5 className="mb-4 text-xl font-semibold text-white">
        Independent LACERA Account
      </h5>
      <div className="p-5 text-lg leading-relaxed rounded-lg bg-black bg-opacity-30 text-zinc-300">
        Former spouse becomes a LACERA member with their own account
        <br />
        Can make independent retirement and benefit elections
      </div>
    </div>
  );

  return (
    <section className="mb-24">
      <h2 className="mb-14 text-4xl font-bold leading-tight text-center text-white">
        LACERA Division Methods
      </h2>
      <div className="grid gap-12 grid-cols-[1fr]">
        <DivisionMethod
          methodNumber="METHOD 1"
          title="Shared Interest"
          description="The former spouse receives a percentage of the member's monthly retirement allowance when the member retires, maintaining a shared interest in the benefit."
          bestFor="Cases where the member controls retirement timing and both parties want to share in future cost-of-living adjustments and benefit changes."
          features={sharedInterestFeatures}
          considerations={[
            "Payments begin only when the member retires",
            "Former spouse has no control over retirement timing",
            "Payments may end upon death of either party unless survivor benefits are included",
          ]}
          colorScheme="blue"
        />

        <DivisionMethod
          methodNumber="METHOD 2"
          title="Separate Interest"
          description="Creates a separate LACERA account for the former spouse, allowing independent retirement decisions and benefit elections based on their allocated service credit."
          bestFor="Former spouses who want complete control over their retirement timing and benefit options, and members who are not yet retired."
          features={separateInterestFeatures}
          additionalContent={separateInterestAdditionalContent}
          colorScheme="violet"
        />

        <DivisionMethod
          methodNumber="METHOD 3"
          title="Lump Sum Distribution"
          description="Provides a one-time lump sum payment to the former spouse based on the present value of their community property interest in the member's LACERA benefits."
          bestFor="Cases where both parties want a clean break, the former spouse prefers immediate access to funds, or when ongoing monthly payments are not practical."
          features={lumpSumFeatures}
          considerations={[
            "Requires complex actuarial calculations to determine present value",
            "Former spouse loses future COLA adjustments and benefit increases",
            "May have significant tax implications for the former spouse",
          ]}
          additionalContent={
            <div className="p-6 mb-6 rounded-xl bg-green-400 bg-opacity-10">
              <h5 className="mb-3 text-lg font-semibold text-green-400">
                Calculation Method:
              </h5>
              <p className="text-base leading-relaxed text-zinc-300">
                The lump sum is calculated using LACERA's actuarial assumptions
                including life expectancy, interest rates, and benefit formulas.
                The calculation considers the community property portion of the
                member's accrued benefit.
              </p>
            </div>
          }
          colorScheme="green"
        />
      </div>
    </section>
  );
};

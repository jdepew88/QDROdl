"use client";

import Link from "next/link";
import { HeroSection } from "@/components/fed_gov/HeroSection";
import { RetirementSystemCard } from "@/components/fed_gov/RetirementSystemCard";
import { ChooseModelSection } from "@/components/fed_gov/ChooseModelSection";

export default function FederalPlanPage() {
  const fersFeatures = [
    {
      title: "✓ Independent Control",
      description:
        "Former spouse controls their own retirement timing and benefit options",
    },
    {
      title: "✓ Separate Benefits",
      description:
        "Creates two distinct CalPERS accounts with separate benefit calculations",
    },
    {
      title: "✓ Health Benefits",
      description:
        "Former spouse may be eligible for CalPERS health benefits upon retirement",
    },
    {
      title: "✓ Survivor Benefits",
      description:
        "Former spouse can designate their own beneficiaries for their account",
    },
  ];

  const modelBFeatures = [
    {
      title: "✓ Proportional Division",
      description:
        "Fair division based on actual service credit earned during marriage",
    },
    {
      title: "✓ Member Controls Timing",
      description:
        "Member decides when to retire; former spouse receives payments when member retires",
    },
    {
      title: "✓ Cost of Living Adjustments",
      description: "Former spouse receives same COLA increases as the member",
    },
    {
      title: "✓ Flexible Implementation",
      description: "Can be used whether member is active or already retired",
    },
  ];

  const modelCFeatures = [
    {
      title: "✓ Immediate Implementation",
      description:
        "Former spouse begins receiving payments immediately upon DRO approval",
    },
    {
      title: "✓ Fixed Percentage",
      description:
        "Division based on a fixed percentage of the current monthly benefit",
    },
    {
      title: "✓ COLA Adjustments",
      description:
        "Former spouse receives proportional cost-of-living increases",
    },
    {
      title: "✓ Lifetime Payments",
      description: "Payments continue for the lifetime of the former spouse",
    },
  ];

  return (
    <div className="w-full">
      <main className="mb-52 min-h-screen w-full bg-neutral-950 bg-opacity-80">
        <HeroSection />

        <div className="px-6 pt-0 pb-24 mx-auto my-0 max-w-[1200px]">
          <section className="mb-24">
            <div className="grid gap-16 items-center mb-16 grid-cols-[1fr_1fr] max-md:gap-10 max-md:grid-cols-[1fr]">
              <div>
                <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
                  Understanding Federal Retirement Systems
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                  Federal employees participate in one of three retirement
                  systems: FERS (most current employees), CSRS (legacy system),
                  or TSP (supplemental savings plan). Each system has unique
                  features and division requirements during divorce.
                </p>
                <p className="text-lg leading-relaxed text-zinc-300">
                  Understanding these systems is essential for federal
                  employees and their spouses when planning for retirement or
                  navigating divorce proceedings involving federal benefits.
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20">
                <img
                  alt="Federal government building representing federal retirement benefits"
                  src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg"
                  className="object-cover overflow-hidden mb-6 w-full rounded-xl h-[280px]"
                />
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Federal Benefits Expertise Required
                </h3>
                <p className="text-base leading-relaxed text-zinc-300">
                  Federal retirement benefits involve complex regulations and
                  specialized procedures. Professional guidance ensures proper
                  handling of FERS, CSRS, and TSP benefits during major life
                  events.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="mb-14 text-4xl font-bold leading-tight text-center text-white">
              Federal Retirement Systems Overview
            </h2>
            <div className="grid gap-12 grid-cols-[1fr]">
              <RetirementSystemCard
                type="FERS"
                title="Federal Employee Retirement System"
                description="A three-tiered retirement system combining a basic annuity, Social Security benefits, and the Thrift Savings Plan (TSP) for federal employees hired after 1983."
                coverInfo={{
                  title: "Covers:",
                  description:
                    "Most federal employees hired after December 31, 1983, including those who transferred from CSRS to FERS.",
                }}
                features={fersFeatures}
                colorScheme="blue"
                additionalContent={
                  <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
                    <h5 className="mb-3 text-lg font-semibold text-white">
                      Important Requirements:
                    </h5>
                    <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                      <li className="mb-2">
                        Member must not be retired at time of DRO filing
                      </li>
                      <li className="mb-2">
                        Minimum service credit requirements must be met
                      </li>
                      <li>
                        Former spouse becomes a CalPERS member with all
                        associated rights and responsibilities
                      </li>
                    </ul>
                  </div>
                }
              />

              <RetirementSystemCard
                type="MODEL B"
                title="Time Rule Order"
                description="Divides the member's retirement benefit based on the ratio of service credit earned during marriage to total service credit."
                coverInfo={{
                  title: "Best For:",
                  description:
                    "Cases where the member has significant pre-marital or post-separation service credit, and a proportional division is desired.",
                }}
                features={modelBFeatures}
                colorScheme="violet"
                additionalContent={
                  <>
                    <div className="p-8 mb-8 text-center rounded-2xl bg-white bg-opacity-10">
                      <h5 className="mb-4 text-xl font-semibold text-white">
                        Time Rule Formula
                      </h5>
                      <div className="p-5 text-lg leading-relaxed rounded-lg bg-black bg-opacity-30 text-zinc-300">
                        Community Property Share = <br />
                        (Service Credit During Marriage ÷ Total Service
                        Credit) × 50%
                      </div>
                    </div>
                    <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
                      <h5 className="mb-3 text-lg font-semibold text-white">
                        Example Calculation:
                      </h5>
                      <p className="mb-3 text-base leading-relaxed text-zinc-300">
                        Member has 20 years total service, 10 years earned
                        during marriage:
                      </p>
                      <p className="p-3 text-base leading-relaxed rounded-md bg-black bg-opacity-30 text-zinc-300">
                        Former spouse share = (10 ÷ 20) × 50% = 25% of total
                        benefit
                      </p>
                    </div>
                  </>
                }
              />

              <RetirementSystemCard
                type="MODEL C"
                title="In Pay Status"
                description="Used when the CalPERS member is already retired and receiving monthly pension payments at the time of divorce."
                coverInfo={{
                  title: "Best For:",
                  description:
                    "Members who are already retired and receiving CalPERS benefits when the divorce is finalized.",
                }}
                features={modelCFeatures}
                colorScheme="green"
                additionalContent={
                  <>
                    <div className="p-6 mb-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
                      <h5 className="mb-3 text-lg font-semibold text-white">
                        Important Limitations:
                      </h5>
                      <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                        <li className="mb-2">
                          Cannot create a separate account for the former
                          spouse
                        </li>
                        <li className="mb-2">
                          Former spouse cannot control retirement timing or
                          benefit options
                        </li>
                        <li>
                          Payments end upon death of either the member or
                          former spouse
                        </li>
                      </ul>
                    </div>
                    <div className="p-6 rounded-xl bg-green-400 bg-opacity-10">
                      <h5 className="mb-3 text-lg font-semibold text-green-400">
                        Survivor Benefit Options:
                      </h5>
                      <p className="text-base leading-relaxed text-zinc-300">
                        The DRO can award survivor benefits to the former
                        spouse, but this will reduce the member's monthly
                        allowance. This decision must be made carefully as it
                        affects both parties' financial security.
                      </p>
                    </div>
                  </>
                }
              />
            </div>
          </section>

          <ChooseModelSection />

          <section className="p-14 text-center rounded-3xl border border-solid bg-blue-400 bg-opacity-10 border-blue-400 border-opacity-20">
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
              Need Professional Assistance?
            </h2>
            <p className="mx-auto mt-0 mb-10 text-lg leading-relaxed max-w-[700px] text-zinc-300">
              CalPERS pension division is complex and requires specialized
              expertise. Our team at QDROdl.app provides comprehensive support
              for CalPERS DRO preparation and processing.
            </p>
            <div className="flex gap-5 justify-center max-sm:flex-col max-sm:items-center">
              <Link
                href="/intake/plans"
                className="px-8 py-4 text-lg font-semibold text-white bg-blue-400 rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] no-underline inline-block"
              >
                Get Expert Help
              </Link>
              <Link
                href="/all_plans"
                className="px-8 py-4 text-lg font-semibold bg-transparent rounded-lg border-2 border-solid transition-all cursor-pointer border-zinc-300 border-opacity-30 duration-[0.2s] text-zinc-300 no-underline inline-block"
              >
                Download Resources
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

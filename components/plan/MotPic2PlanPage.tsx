"use client";

import Link from "next/link";

export default function MotPic2PlanPage() {
  return (
    <div className="w-full bg-neutral-950">
      <main className="min-h-screen bg-neutral-950 bg-opacity-80">
        <section className="bg-[linear-gradient(135deg,rgba(93,41,190,0.1),rgba(72,161,255,0.1))] px-6 py-16 text-center">
          <div className="mx-auto my-0 max-w-[1200px]">
            <h1 className="mb-6 text-6xl font-bold leading-tight text-white max-md:text-4xl max-sm:text-3xl">
              Motion Picture Industry Pension and Health Plans QDRO Guide
            </h1>
            <p className="mx-auto mb-8 mt-0 max-w-[800px] text-xl leading-relaxed text-zinc-300">
              Comprehensive guide to dividing Motion Picture Industry Pension
              Plan and Individual Account Program benefits through a single
              unified qualified domestic relations order.
            </p>
            <div className="mt-8 flex justify-center gap-4 max-sm:flex-col max-sm:items-center">
              <div className="rounded-lg border border-solid border-blue-400 border-opacity-30 bg-blue-400 bg-opacity-10 px-4 py-2 text-sm font-semibold text-blue-400">
                Defined Benefit Plan
              </div>
              <div className="rounded-lg border border-solid border-violet-600 border-opacity-30 bg-violet-600 bg-opacity-10 px-4 py-2 text-sm font-semibold text-violet-300">
                Individual Account Program
              </div>
              <div className="rounded-lg border border-solid border-green-400 border-opacity-30 bg-green-400 bg-opacity-10 px-4 py-2 text-sm font-semibold text-green-400">
                Unified QDRO
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto my-0 max-w-[1200px] px-6 pb-24">
          <section id="overview" className="mb-24">
            <div className="mb-16 grid grid-cols-[1fr_1fr] items-center gap-16 max-md:grid-cols-[1fr] max-md:gap-10">
              <div>
                <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
                  Understanding Motion Picture Industry QDROs
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                  When dividing Motion Picture Industry Pension Plan and
                  Individual Account Program benefits during divorce, a single
                  unified QDRO can address both the defined benefit pension and
                  the individual account components simultaneously.
                </p>
                <p className="text-lg leading-relaxed text-zinc-300">
                  This unified approach streamlines the division process,
                  reduces administrative complexity, and ensures consistent
                  treatment across both plan components.
                </p>
              </div>
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <img
                  alt="Legal documents for motion picture QDRO"
                  src="https://images.pexels.com/photos/8441866/pexels-photo-8441866.jpeg"
                  className="mb-6 h-[280px] w-full overflow-hidden rounded-xl object-cover"
                />
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Motion Picture QDRO Expertise
                </h3>
                <p className="text-base leading-relaxed text-zinc-300">
                  These QDROs require specialized knowledge of entertainment
                  industry pension structures, vesting schedules, and the
                  interplay between defined benefit and individual account
                  components.
                </p>
              </div>
            </div>
          </section>

          <section id="division-methods" className="mb-24">
            <h2 className="mb-14 text-center text-4xl font-bold leading-tight text-white">
              Motion Picture Industry QDRO Distribution Methods
            </h2>
            <div className="grid grid-cols-[1fr] gap-8">
              <div className="relative overflow-hidden rounded-3xl border-2 border-solid border-blue-400 border-opacity-20 bg-blue-400 bg-opacity-10 p-10">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-blue-400" />
                <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
                  Method 1: Immediate Lump Sum Distribution
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                  The alternate payee receives their awarded portion from both
                  the defined benefit plan (as a lump-sum equivalent where
                  available) and IAP shortly after QDRO approval.
                </p>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Immediate access and cleaner financial separation</li>
                  <li>Rollover options for tax planning flexibility</li>
                  <li>Needs careful handling to avoid tax penalties</li>
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-3xl border-2 border-solid border-violet-700 border-opacity-20 bg-violet-700 bg-opacity-10 p-10">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-violet-700" />
                <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
                  Method 2: Shared Interest in Future Benefits
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                  The alternate payee maintains a shared interest and receives
                  benefits when participant eligibility and plan rules permit.
                </p>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Keeps tax-deferred growth for longer</li>
                  <li>Can preserve long-term value potential</li>
                  <li>Timing depends on participant status and plan rules</li>
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-3xl border-2 border-solid border-green-400 border-opacity-20 bg-green-400 bg-opacity-10 p-10">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-green-400" />
                <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
                  Method 3: Separate Benefit Stream
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                  The alternate payee receives a separate stream of benefits
                  from the defined benefit pension and independent access rules
                  for their IAP share.
                </p>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Independent monthly pension stream design</li>
                  <li>Separate handling of IAP distributions</li>
                  <li>Strong option for long-term autonomy</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="plan-types" className="mb-24">
            <h2 className="mb-8 text-center text-4xl font-bold leading-tight text-white">
              Choosing the Right Method
            </h2>
            <p className="mx-auto mb-14 mt-0 max-w-[800px] text-center text-lg leading-relaxed text-zinc-300">
              Method selection depends on vesting status, participant career
              stage, and whether immediate liquidity or long-term benefit
              streams best fit your goals.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <h3 className="mb-5 text-2xl font-semibold text-white">
                  Legal Considerations
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Entertainment industry employment patterns</li>
                  <li>ERISA and plan-specific qualification rules</li>
                  <li>Coordination requirements for unified orders</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <h3 className="mb-5 text-2xl font-semibold text-white">
                  Financial Factors
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Pension valuation versus IAP account balance</li>
                  <li>Vesting and service-credit timelines</li>
                  <li>Tax timing and liquidity needs</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <h3 className="mb-5 text-2xl font-semibold text-white">
                  Documentation
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Unified QDRO language for both components</li>
                  <li>Certified decree and plan transmittal forms</li>
                  <li>Earnings and service history support</li>
                </ul>
              </div>
            </div>
          </section>

          <section
            id="qdro-process"
            className="mb-24 rounded-3xl border border-solid border-blue-400 border-opacity-20 bg-blue-400 bg-opacity-10 p-10 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
              Need Professional Assistance?
            </h2>
            <p className="mx-auto mb-10 mt-0 max-w-[700px] text-lg leading-relaxed text-zinc-300">
              Motion picture pension and IAP division often requires specialized
              drafting. We can help structure language for both components in a
              single workflow.
            </p>
            <div className="flex justify-center gap-5 max-sm:flex-col max-sm:items-center">
              <Link
                href="/intake/plans"
                className="rounded-lg bg-blue-400 px-8 py-4 text-lg font-semibold text-white no-underline transition-all duration-[0.2s]"
              >
                Get Expert Help
              </Link>
              <Link
                href="/all_plans"
                className="rounded-lg border-2 border-solid border-zinc-300 border-opacity-30 bg-transparent px-8 py-4 text-lg font-semibold text-zinc-300 no-underline transition-all duration-[0.2s]"
              >
                Download Resources
              </Link>
            </div>
          </section>

          <section id="resources" className="rounded-2xl bg-black bg-opacity-20 p-6">
            <p className="text-sm text-zinc-300">
              This page is educational and not legal advice. Please consult a
              qualified attorney for case-specific recommendations.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

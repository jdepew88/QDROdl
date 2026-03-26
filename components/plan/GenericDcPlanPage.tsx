"use client";

import Link from "next/link";

type PlanCardProps = {
  planType: string;
  title: string;
  description: string;
  availableTo: string;
  colorScheme: "blue" | "violet" | "green";
  children: React.ReactNode;
};

function PlanCard({
  planType,
  title,
  description,
  availableTo,
  colorScheme,
  children,
}: PlanCardProps) {
  const colorClasses = {
    blue: {
      border: "border-blue-400 border-opacity-20",
      bg: "bg-blue-400 bg-opacity-10",
      accent: "bg-blue-400",
      badge: "bg-blue-400",
      text: "text-blue-400",
    },
    violet: {
      border: "border-violet-800 border-opacity-20",
      bg: "bg-violet-800 bg-opacity-10",
      accent: "bg-violet-800",
      badge: "bg-violet-800",
      text: "text-violet-300",
    },
    green: {
      border: "border-green-400 border-opacity-20",
      bg: "bg-green-400 bg-opacity-10",
      accent: "bg-green-400",
      badge: "bg-green-400",
      text: "text-green-400",
    },
  };
  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 border-solid p-12 ${colors.bg} ${colors.border}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 ${colors.accent}`} />
      <div className="grid grid-cols-[1fr_2fr] items-start gap-12 max-md:grid-cols-[1fr] max-md:gap-8">
        <div>
          <div
            className={`mb-6 rounded-xl px-6 py-4 text-center text-lg font-semibold text-white ${colors.badge}`}
          >
            {planType}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
            {title}
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
          <div className={`mb-6 rounded-xl p-5 ${colors.bg}`}>
            <h4 className={`mb-3 text-lg font-semibold ${colors.text}`}>
              Available To:
            </h4>
            <p className="text-base leading-relaxed text-zinc-300">
              {availableTo}
            </p>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function GenericDcPlanPage() {
  return (
    <div className="w-full">
      <main className="min-h-screen bg-neutral-950 bg-opacity-80">
        <section className="bg-[linear-gradient(135deg,rgba(93,41,190,0.1),rgba(72,161,255,0.1))] px-6 py-16 text-center">
          <div className="mx-auto my-0 max-w-[1200px]">
            <h1 className="mb-6 text-6xl font-bold leading-tight text-white max-md:text-4xl max-sm:text-3xl">
              Defined Contribution Plans in Divorce
            </h1>
            <p className="mx-auto mb-8 mt-0 max-w-[800px] text-xl leading-relaxed text-zinc-300">
              Understanding how 401(k), 403(b), TSP, and other defined
              contribution retirement plans are valued and divided during
              divorce proceedings, including pre-marriage separate interests.
            </p>
            <div className="mt-8 flex justify-center gap-4 max-sm:flex-col max-sm:items-center">
              <div className="rounded-lg border border-solid border-blue-400 border-opacity-30 bg-blue-400 bg-opacity-10 px-4 py-2 text-sm font-semibold text-blue-400">
                401(k): Private Sector Plans
              </div>
              <div className="rounded-lg border border-solid border-violet-800 border-opacity-30 bg-violet-800 bg-opacity-10 px-4 py-2 text-sm font-semibold text-violet-300">
                403(b): Non-Profit & Education
              </div>
              <div className="rounded-lg border border-solid border-green-400 border-opacity-30 bg-green-400 bg-opacity-10 px-4 py-2 text-sm font-semibold text-green-400">
                TSP: Federal Employee Plans
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto my-0 max-w-[1200px] px-6 pb-24">
          <section className="mb-24">
            <div className="mb-16 grid grid-cols-[1fr_1fr] items-center gap-16 max-md:grid-cols-[1fr] max-md:gap-10">
              <div>
                <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
                  Understanding Defined Contribution Plans
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                  Defined contribution plans like 401(k), 403(b), and TSP are
                  individual investment accounts. Unlike pensions, balances
                  fluctuate based on investment performance and contribution
                  history.
                </p>
                <p className="text-lg leading-relaxed text-zinc-300">
                  During divorce, these accounts require careful valuation and
                  division, including proper handling of pre-marriage separate
                  interests through actuarial analysis or agreed values.
                </p>
              </div>
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <img
                  alt="Defined contribution plans and legal analysis"
                  src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg"
                  className="mb-6 h-[280px] w-full overflow-hidden rounded-xl object-cover"
                />
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Specialized Valuation Expertise Required
                </h3>
                <p className="text-base leading-relaxed text-zinc-300">
                  Accurate separation of marital and separate-property interests
                  often depends on contribution tracing and growth allocation.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="mb-14 text-center text-4xl font-bold leading-tight text-white">
              Types of Defined Contribution Plans
            </h2>
            <div className="grid grid-cols-[1fr] gap-12">
              <PlanCard
                planType="401(k)"
                title="Private Sector Retirement Plans"
                description="Common employer-sponsored plans allowing pre-tax or Roth contributions with possible employer matching."
                availableTo="Employees of private companies, corporations, and some non-profits."
                colorScheme="blue"
              >
                <h4 className="mb-5 text-xl font-semibold text-white">
                  Key Features:
                </h4>
                <div className="mb-8 grid grid-cols-[1fr_1fr] gap-6 max-sm:grid-cols-[1fr]">
                  <div className="rounded-xl bg-white bg-opacity-10 p-5 text-zinc-300">
                    Employee and employer contributions
                  </div>
                  <div className="rounded-xl bg-white bg-opacity-10 p-5 text-zinc-300">
                    Broad investment menu and vesting schedules
                  </div>
                </div>
                <div className="rounded-xl border border-solid border-white border-opacity-10 p-6">
                  <h5 className="mb-3 text-lg font-semibold text-white">
                    Divorce Considerations:
                  </h5>
                  <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                    <li>Pre-marriage balances may require actuarial support</li>
                    <li>Employer match rules and vesting can affect division</li>
                    <li>Market gains/losses affect final split</li>
                  </ul>
                </div>
              </PlanCard>

              <PlanCard
                planType="403(b)"
                title="Non-Profit and Education Plans"
                description="Tax-advantaged plans for public schools, qualifying non-profits, and some ministers."
                availableTo="Teachers, school administrators, university and hospital employees, and non-profit workers."
                colorScheme="violet"
              >
                <h4 className="mb-5 text-xl font-semibold text-white">
                  Pre-Marriage Separate Interest:
                </h4>
                <div className="mb-8 rounded-2xl bg-white bg-opacity-10 p-8 text-center">
                  <div className="rounded-lg bg-black bg-opacity-30 p-5 text-lg leading-relaxed text-zinc-300">
                    Pre-marriage separate interests should be handled by an
                    actuary or clearly agreed amounts.
                  </div>
                </div>
                <div className="rounded-xl border border-solid border-white border-opacity-10 p-6">
                  <h5 className="mb-3 text-lg font-semibold text-white">
                    Valuation Requirement:
                  </h5>
                  <p className="rounded-md bg-black bg-opacity-30 p-3 text-zinc-300">
                    Pre-marriage balance and associated growth should be traced
                    separately from marital contributions.
                  </p>
                </div>
              </PlanCard>

              <PlanCard
                planType="TSP"
                title="Thrift Savings Plan"
                description="Federal defined contribution plan available to federal employees and uniformed service members."
                availableTo="FERS and CSRS employees, military personnel, and eligible uniformed services members."
                colorScheme="green"
              >
                <h4 className="mb-5 text-xl font-semibold text-white">
                  Highlights:
                </h4>
                <ul className="mb-8 list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Core funds and lifecycle options</li>
                  <li>Very low administrative fees</li>
                  <li>Matching contributions for eligible employees</li>
                </ul>
                <div className="rounded-xl bg-green-400 bg-opacity-10 p-6">
                  <h5 className="mb-3 text-lg font-semibold text-green-400">
                    Withdrawal Options:
                  </h5>
                  <p className="text-zinc-300">
                    Monthly payments, partial withdrawals, and rollover options
                    can be coordinated through proper order language.
                  </p>
                </div>
              </PlanCard>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="mb-8 text-center text-4xl font-bold leading-tight text-white">
              Defined Contribution Plans and Divorce
            </h2>
            <p className="mx-auto mb-14 mt-0 max-w-[800px] text-center text-lg leading-relaxed text-zinc-300">
              QDRO language must match plan requirements and handle pre-marriage
              separate interests with clarity.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <h3 className="mb-5 text-2xl font-semibold text-white">
                  QDRO Requirements
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Plan-specific qualification language</li>
                  <li>Administrator review and approval workflow</li>
                  <li>Correct treatment of pre-marriage interests</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <h3 className="mb-5 text-2xl font-semibold text-white">
                  Actuarial Analysis
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Contribution tracing over time</li>
                  <li>Growth allocation between separate and marital shares</li>
                  <li>Matching contribution analysis</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
                <h3 className="mb-5 text-2xl font-semibold text-white">
                  Documentation
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-zinc-300">
                  <li>Account statements from date of marriage</li>
                  <li>Order drafts and plan forms</li>
                  <li>Supporting valuation report when needed</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-solid border-blue-400 border-opacity-20 bg-blue-400 bg-opacity-10 p-14 text-center">
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
              Need Expert Defined Contribution Analysis?
            </h2>
            <p className="mx-auto mb-10 mt-0 max-w-[700px] text-lg leading-relaxed text-zinc-300">
              We prepare defined contribution QDRO language and coordinate
              valuation-sensitive terms so plan approval is smoother.
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
        </div>
      </main>
    </div>
  );
}

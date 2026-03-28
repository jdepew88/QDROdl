import Link from "next/link";
import RevealOnScroll from "@/app/get-started/RevealOnScroll";
import { PROCESS_OVERVIEW_STEPS } from "@/data/processOverview";

export default function ProcessOverviewContent() {
  const steps = PROCESS_OVERVIEW_STEPS;

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(1200px_circle_at_0%_0%,rgba(59,130,246,0.22),transparent_50%),radial-gradient(900px_circle_at_100%_0%,rgba(132,204,22,0.16),transparent_55%)] p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-300/90">
              QDRO PROCESS
            </p>
            <h1 className="mt-2 text-3xl font-bold text-stone-50">Get started</h1>
            <p className="mt-3 max-w-3xl text-zinc-300">
              From intake to final service, follow these five steps to keep your
              order package moving and reduce avoidable delays.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200">
            Typical lifecycle:{" "}
            <span className="font-semibold text-stone-50">2-6 weeks</span>
          </div>
        </div>
      </section>

      <section className="relative mt-10">
        <div className="absolute bottom-8 left-[1.1rem] top-8 hidden w-px bg-white/15 md:block" />
        <div className="space-y-5">
          {steps.map((step, idx) => (
            <RevealOnScroll key={step.title} delayMs={idx * 90}>
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 md:ml-12">
                <div className="absolute -left-12 top-6 hidden h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-sm md:flex">
                  {idx + 1}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-stone-50">
                    <span className="mr-2">{step.icon}</span>
                    {idx + 1}) {step.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full border border-lime-500/30 bg-lime-500/10 px-2.5 py-1 font-medium text-lime-300">
                      {step.phase}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-zinc-300">
                      {step.eta}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-300">{step.detail}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-stone-50">
          Included with your draft order package
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          Your package includes more than the draft order itself so you can move
          from review to filing and service smoothly.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <RevealOnScroll delayMs={80}>
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <div className="mb-3 inline-flex rounded-lg border border-blue-400/30 bg-blue-400/10 px-2.5 py-1 text-xs font-medium text-blue-300">
                Used before filing
              </div>
              <h3 className="text-base font-semibold text-stone-50">
                Letter for pre-approval
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                A transmittal letter to send the draft order to the plan
                administrator for pre-approval before final court filing.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={180}>
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <div className="mb-3 inline-flex rounded-lg border border-violet-400/30 bg-violet-400/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                Used after filing
              </div>
              <h3 className="text-base font-semibold text-stone-50">
                Letter to serve the plan admin
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                A service cover letter for sending the court-filed order package to
                the plan administrator after filing.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/intake/plans"
          className="inline-flex w-fit rounded-xl bg-lime-800 px-5 py-3 text-sm font-semibold text-white hover:bg-lime-700"
        >
          Start intake
        </Link>
        <Link
          href="/all_plans"
          className="inline-flex w-fit text-sm font-medium text-zinc-300 underline-offset-4 hover:text-white hover:underline"
        >
          Browse all plans
        </Link>
      </div>
    </>
  );
}

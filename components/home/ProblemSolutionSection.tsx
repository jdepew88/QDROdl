import React from "react";

export default function ProblemSolutionSection() {
  return (
    <section className="border-t border-white/10 bg-zinc-950 py-20 md:py-24">
      <div className="mx-auto max-w-screen-lg px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-50 md:text-4xl">
          Divorce paperwork shouldn&apos;t cost thousands
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-300/90">
              The problem
            </p>
            <ul className="mt-5 space-y-4 text-base leading-relaxed text-zinc-300">
              <li className="flex gap-3">
                <span className="text-rose-400" aria-hidden>
                  ·
                </span>
                <span>Attorneys charge $1,500–$3,000+ for a single QDRO</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rose-400" aria-hidden>
                  ·
                </span>
                <span>Plans reject orders with incorrect or generic language</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rose-400" aria-hidden>
                  ·
                </span>
                <span>Revisions and back-and-forth delay your case for months</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-lime-500/25 bg-lime-950/15 p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-lime-300/90">
              Our approach
            </p>
            <p className="mt-5 text-base leading-relaxed text-zinc-200">
              QDROdl automates drafting using{" "}
              <strong className="text-stone-100">structured templates</strong>{" "}
              tailored to your retirement plan—so you get plan-appropriate
              language and a smoother path to approval.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Your{" "}
              <strong className="text-zinc-300">Judgment of Dissolution of Marriage</strong>{" "}
              (or divorce decree) sets the{" "}
              <strong className="text-zinc-300">broad terms</strong> of how
              retirement benefits will be divided. The{" "}
              <strong className="text-zinc-300">plan administrator</strong> then
              applies those terms to the specifics of the account or benefit. The
              hard part of QDROs isn&apos;t “one form”—it&apos;s that{" "}
              <strong className="text-zinc-300">
                every plan type has different rules
              </strong>
              . We build for the plans we know well.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <p className="text-base leading-relaxed text-zinc-300">
            Much of the complexity in QDRO work comes from how many different
            retirement systems exist—each with its own forms and language.{" "}
            <strong className="text-stone-200">
              We focus on plans that are common in Southern California
            </strong>
            . That narrower, specialized scope lets us use modern tools to move
            you through intake and drafting{" "}
            <strong className="text-stone-200">quickly and efficiently</strong>
            —so you don&apos;t need an overpriced &quot;QDRO-only&quot; attorney
            for a straightforward division.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            By the end of the process, you&apos;ll be{" "}
            <strong className="text-stone-200">
              more comfortable with how QDROs work
            </strong>{" "}
            and clearer that{" "}
            <strong className="text-stone-200">
              your interest and your former spouse&apos;s interest
            </strong>{" "}
            in the plan or account are being divided in line with what you
            agreed in your judgment or decree—not left to guesswork.
          </p>
        </div>
      </div>
    </section>
  );
}

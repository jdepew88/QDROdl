"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Joinders in California dissolution — educational guide + optional Stripe checkout.
 * Practice varies by plan and court; users should confirm with plan counsel.
 *
 * Append `?matterId=<cuid>` so paid checkout posts fees to that matter (Stripe webhook).
 */
export default function JoindersContent() {
  const [includeMailFiling, setIncludeMailFiling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [matterIdFromUrl, setMatterIdFromUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = new URLSearchParams(window.location.search).get("matterId");
    setMatterIdFromUrl(id?.trim() || null);
  }, []);

  const startCheckout = async () => {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("/api/checkout/joinder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          includeMailFiling,
          ...(matterIdFromUrl ? { matterId: matterIdFromUrl } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to start checkout");
      window.location.href = data.url;
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="sr-only">
        When retirement plans must be joined to a dissolution case in California,
        and how QDROdl handles joinder preparation.
      </p>
      <main className="mb-52 min-h-screen bg-zinc-950">
        <section className="bg-[linear-gradient(135deg,rgba(168,85,247,0.12),rgba(132,204,22,0.1))] px-6 py-16 text-center">
          <div className="mx-auto max-w-[1200px]">
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-300/90">
              California dissolution
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white max-md:text-3xl md:text-5xl md:leading-tight">
              Joinders &amp; retirement plans
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-lg leading-relaxed text-zinc-300 md:text-xl">
              Making the plan a party to your case when the administrator or court
              procedure requires it—so orders you send to the plan can stick.
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-sm:flex-col max-sm:items-center">
              <span className="rounded-lg border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-200">
                Pleading in your divorce case
              </span>
              <span className="rounded-lg border border-lime-500/30 bg-lime-500/10 px-4 py-2 text-sm font-semibold text-lime-300">
                Often used for major CA public pensions
              </span>
              <span className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                Often not needed for many DC accounts
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-0">
          <section className="mb-20 mt-16 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                What a joinder is
              </h2>
              <p className="mb-4 text-base leading-relaxed text-zinc-300">
                A <strong className="text-stone-200">joinder</strong> (sometimes called joining the plan) is a
                procedure in your <strong className="text-stone-200">dissolution or legal separation</strong> case
                that adds the <strong className="text-stone-200">employee benefit plan</strong> (or related entity)
                as a <strong className="text-stone-200">party</strong> or otherwise brings the plan under the
                court&apos;s authority so the judge can enter orders the plan is expected to honor.
              </p>
              <p className="text-base leading-relaxed text-zinc-300">
                It is <strong className="text-stone-200">not</strong> the same document as a{" "}
                <strong className="text-stone-200">QDRO/DRO</strong>. The joinder gets the plan into the lawsuit;
                the <strong className="text-stone-200">domestic relations order</strong> is the instrument that
                assigns benefits to an alternate payee once the plan accepts it.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-lg font-semibold text-white">California context</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                California practice and statutes address joinder of employee benefit plans in marital
                proceedings. Local court rules and forms differ by county. Your attorney should confirm{" "}
                <strong className="text-zinc-300">timing</strong> (e.g. before or after certain orders) and{" "}
                <strong className="text-zinc-300">caption requirements</strong> for your venue.
              </p>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Which plans usually need a joinder?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-lime-500/20 bg-lime-950/10 p-6">
                <h3 className="mb-3 text-lg font-semibold text-lime-200">
                  Often yes (confirm every time)
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-zinc-300">
                  <li>• <strong className="text-stone-200">CalPERS</strong> — commonly joined in dissolution.</li>
                  <li>• <strong className="text-stone-200">CalSTRS</strong> — similar public-system practice.</li>
                  <li>
                    • <strong className="text-stone-200">County &quot;1937 Act&quot; systems</strong> (e.g. LACERA) —
                    frequently joined.
                  </li>
                  <li>
                    • <strong className="text-stone-200">City public safety pensions</strong> (e.g. LAFPP) — often
                    joined per plan/city materials.
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-3 text-lg font-semibold text-zinc-200">
                  Often no (still verify)
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-zinc-400">
                  <li>
                    • Many <strong className="text-zinc-300">defined contribution</strong> plans (typical 401(k),
                    403(b), governmental 457(b)) accept QDROs/DROs <strong className="text-zinc-300">without</strong>{" "}
                    a joinder—but policies vary.
                  </li>
                  <li>
                    • Some recordkeepers still want specific captions or procedures even when a classic joinder is
                    not filed.
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              <strong className="text-zinc-400">Rule of thumb:</strong> read the plan&apos;s QDRO/DRO instructions
              and ask the plan&apos;s benefits office. Do not assume from a generic list.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              How QDROdl treats joinders
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-zinc-300">
              <p>
                We prepare joinder-related work <strong className="text-stone-200">only when required</strong> for
                your matter—not as a default upsell. If your plan and court path do not require joining the plan,
                we focus on the domestic relations order package.
              </p>
              <p>
                When a joinder <strong className="text-stone-200">is</strong> required, timing, fees, and filing
                steps are explained in your <strong className="text-stone-200">QDRO prep process</strong> overview (
                <Link href="/get-started" className="font-medium text-lime-400 hover:underline">
                  Get started
                </Link>
                ) and in the{" "}
                <Link href="/#faq" className="font-medium text-lime-400 hover:underline">
                  FAQ
                </Link>
                . Many clients address joinder scope when they start intake for the underlying order.
              </p>
            </div>
          </section>

          <section className="mb-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <h2 className="mb-4 text-2xl font-bold text-white">Disclaimer</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              This guide is educational, not legal advice. Procedures change by plan, county, and year. Confirm
              requirements with your attorney and the plan administrator.
            </p>
          </section>

          <section className="mb-16 rounded-2xl border border-violet-500/25 bg-violet-950/20 p-8 md:p-10">
            <h2 className="mb-2 text-2xl font-bold text-white">Standalone joinder checkout</h2>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              If you already know you need a joinder package and your attorney directed you here, you can start
              payment below. <strong className="text-zinc-300">Optional mail filing</strong> adds court and postage
              costs where applicable. For matters already in intake with us, joinder may be bundled—see FAQ.
            </p>
            <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-lime-600"
                checked={includeMailFiling}
                onChange={(e) => setIncludeMailFiling(e.target.checked)}
              />
              <span className="text-sm text-zinc-300">
                Include optional <strong className="text-stone-200">mail filing</strong> assistance (additional
                court and mailing fees as quoted).
              </span>
            </label>
            {matterIdFromUrl && (
              <p className="mb-4 rounded-lg border border-lime-500/25 bg-lime-950/30 px-4 py-2 text-sm text-lime-100">
                Checkout will be linked to matter <code className="text-lime-200">{matterIdFromUrl}</code> for
                automatic fee ledger entries after Stripe confirms payment.
              </p>
            )}
            {err && (
              <p className="mb-4 rounded-lg border border-rose-500/30 bg-rose-950/40 px-4 py-2 text-sm text-rose-200">
                {err}
              </p>
            )}
            <button
              type="button"
              onClick={startCheckout}
              disabled={loading}
              className="rounded-xl bg-lime-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-lime-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Starting checkout…" : "Purchase joinder preparation"}
            </button>
            <p className="mt-3 text-xs text-zinc-500">
              You will be redirected to Stripe to complete payment. Pricing is subject to the checkout session
              returned by the server.
            </p>
          </section>

          <section className="rounded-3xl border border-lime-500/25 bg-lime-950/15 p-10 text-center md:p-14">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Start with intake when you need the full package
            </h2>
            <p className="mx-auto mb-8 max-w-[640px] text-base text-zinc-300">
              Most users begin with guided intake so plan choice, joinder need, and order type stay aligned.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/intake/plans"
                className="inline-flex rounded-xl bg-lime-700 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-lime-600"
              >
                Start intake
              </Link>
              <Link
                href="/all_plans"
                className="inline-flex rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-stone-100 transition hover:bg-white/10"
              >
                All plans
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

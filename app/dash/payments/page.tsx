"use client";

import Link from "next/link";

export default function PaymentsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 lg:px-10 lg:py-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Payments
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-stone-50">
        Billing, invoices & receipts
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        <Link href="/dash" className="text-lime-400 hover:underline">
          Back to overview
        </Link>
      </p>

      <section className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-950/30 p-5 text-sm text-amber-100">
        <p className="font-medium text-amber-50">Payment acceptance (skeleton)</p>
        <p className="mt-2 text-amber-100/90">
          Card and ACH checkout will connect here (e.g. Stripe). You will be able
          to pay open balances, save a payment method, and receive email
          confirmations.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-stone-100">Invoices</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Open and past invoices will list here with status (draft, open, paid).
          <strong className="text-zinc-300"> Download PDF</strong> and{" "}
          <strong className="text-zinc-300">print</strong> will be available per
          row.
        </p>
        <div className="mt-6 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-zinc-500">
          No invoices yet.
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-stone-100">Receipts</h2>
        <p className="mt-2 text-sm text-zinc-400">
          After each successful payment, a receipt will appear here. You can{" "}
          <strong className="text-zinc-300">download</strong> or{" "}
          <strong className="text-zinc-300">print</strong> any receipt as many
          times as you need.
        </p>
        <div className="mt-6 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-zinc-500">
          No receipts yet.
        </div>
      </section>
    </main>
  );
}

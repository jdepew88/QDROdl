"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Client portal</h1>
      <p className="mt-3 text-zinc-600">
        Sign-in, matter history, downloads, and payment status will live here.
        This is a layout shell for the next backend milestone.
      </p>
      <ul className="mt-8 list-disc space-y-2 pl-5 text-zinc-700">
        <li>Open matters and intake summaries</li>
        <li>Draft QDRO / joinder downloads</li>
        <li>Stripe receipts and add-on orders</li>
      </ul>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/intake/plans"
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          New intake
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
        >
          Home
        </Link>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";

const PLANS = [
  {
    href: "/calpers",
    title: "CalPERS",
    subtitle: "California Public Employees’ Retirement System",
  },
  {
    href: "/calstrs",
    title: "CalSTRS",
    subtitle: "California State Teachers’ Retirement System",
  },
  {
    href: "/lacera",
    title: "LACERA",
    subtitle: "Los Angeles County Employees Retirement Association",
  },
  {
    href: "/la457",
    title: "County of LA Deferred Compensation",
    subtitle: "457(b) and related deferred compensation",
  },
  {
    href: "/mp",
    title: "Motion Picture Industry plans",
    subtitle: "MPI pension (DB) and IAP (DC) models",
  },
  {
    href: "/generic_dc",
    title: "Generic defined contribution",
    subtitle: "401(k), 403(b), and similar DC plans",
  },
  {
    href: "/federal",
    title: "Federal retirement",
    subtitle: "FERS, CSRS, and TSP-related divisions",
  },
  {
    href: "/joinders",
    title: "Joinders",
    subtitle: "When the plan must be joined to the dissolution case",
  },
] as const;

export default function PlansIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">
        Plans we support
      </h1>
      <p className="text-zinc-600 mb-10 max-w-2xl">
        Guides and intake paths for the retirement systems QDROdl focuses on.
        Start the questionnaire when you’re ready—we’ll route questions based on
        the plans you select.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400 hover:shadow-md"
            >
              <span className="text-lg font-semibold text-zinc-900">
                {p.title}
              </span>
              <span className="mt-1 block text-sm text-zinc-600">
                {p.subtitle}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        <Link
          href="/intake/plans"
          className="font-medium text-lime-800 underline-offset-4 hover:underline"
        >
          Begin intake — select plans
        </Link>
      </p>
    </main>
  );
}

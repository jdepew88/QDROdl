import Link from "next/link";
import React from "react";
import { planPath } from "@/data/planRoutes";

const californiaPlans = [
  { slug: "calpers" as const, label: "CalPERS" },
  { slug: "calstrs" as const, label: "CalSTRS" },
  { slug: "lacera" as const, label: "LACERA" },
];

const otherPlans = [
  {
    slug: "la457" as const,
    label: "Los Angeles Deferred Compensation (457)",
  },
  { slug: "mp" as const, label: "Motion Picture Industry Plans" },
];

export default function SupportedPlansHomeSection() {
  return (
    <section
      id="supported-plans"
      className="border-t border-white/10 bg-stone-950 py-20 md:py-24"
      aria-labelledby="supported-plans-heading"
    >
      <div className="mx-auto max-w-screen-lg px-6">
        <h2
          id="supported-plans-heading"
          className="text-center text-3xl font-bold tracking-tight text-stone-50 md:text-4xl"
        >
          Supported retirement plans
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-zinc-400">
          Guides and intake paths for systems we support—full list on{" "}
          <Link href="/all_plans" className="text-lime-400 underline-offset-2 hover:underline">
            all plans
          </Link>
          .
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-lime-400/90">
              California public plans
            </h3>
            <ul className="mt-5 space-y-3">
              {californiaPlans.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={planPath(p.slug)}
                    className="text-base font-medium text-stone-100 underline-offset-2 transition hover:text-lime-200 hover:underline"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Other plans
            </h3>
            <ul className="mt-5 space-y-3">
              {otherPlans.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={planPath(p.slug)}
                    className="text-base font-medium text-stone-100 underline-offset-2 transition hover:text-lime-200 hover:underline"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/chat"
            className="inline-flex text-sm font-semibold text-lime-300 underline-offset-4 transition hover:text-lime-200 hover:underline"
          >
            Not sure which plan applies? We&apos;ll help you choose →
          </Link>
        </p>
      </div>
    </section>
  );
}

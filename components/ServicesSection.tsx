import React from "react";
import Link from "next/link";
import { planPath, type PlanSlug } from "@/data/planRoutes";

type ServiceCard = {
  slug: PlanSlug;
  title: string;
  description: string;
};

const services: ServiceCard[] = [
  {
    slug: "calpers",
    title: "CalPERS",
    description:
      "California Public Employees' Retirement System benefit divisions with precise calculations.",
  },
  {
    slug: "calstrs",
    title: "CalSTRS",
    description:
      "California State Teachers' Retirement System pension and benefit divisions.",
  },
  {
    slug: "lacera",
    title: "LACERA",
    description:
      "Los Angeles County Employees Retirement Association plan divisions.",
  },
  {
    slug: "la457",
    title: "Co LA Deferred Comp",
    description:
      "County of Los Angeles deferred compensation plan benefit divisions.",
  },
  {
    slug: "mp",
    title: "Motion Picture Plan",
    description:
      "Entertainment industry retirement plan divisions and survivor benefits.",
  },
  {
    slug: "generic_dc",
    title: "Generic Defined Contribution",
    description:
      "Standard defined contribution plan divisions (e.g. 401(k), 403(b), 457) with clear alternate-payee language.",
  },
  {
    slug: "generic_db",
    title: "Generic Defined Benefit Plans",
    description:
      "Traditional pensions—formula-based monthly benefits, not individual account balances—drafted to plan rules.",
  },
  {
    slug: "federal",
    title: "Federal (FERS, CSRS, TSP)",
    description:
      "Federal employee retirement divisions including TSP, FERS, and CSRS benefits.",
  },
  {
    slug: "joinders",
    title: "Joinders",
    description:
      "Pleadings that join the retirement plan to your dissolution case when the administrator requires it before accepting a QDRO or DRO.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto my-0 max-w-screen-lg px-6 py-0">
        <div className="mb-16 text-center">
          <h2 className="mb-6 max-sm:text-4xl text-6xl font-[538] leading-none text-stone-50">
            Our QDRO Services
          </h2>
          <p className="mx-auto my-0 max-w-[600px] text-xl text-slate-300 max-sm:text-lg">
            We specialize in preparing QDROs for these major retirement plan
            types
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={planPath(service.slug)}
              className="block rounded-lg border-t border-solid border-t-white border-t-opacity-10 bg-neutral-900 p-8 no-underline transition-[background] duration-[0.3s] ease-[ease] hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            >
              <h3 className="mx-auto mb-4 flex flex-col text-center text-xl font-[538] text-stone-50">
                {service.title}
              </h3>
              <p className="text-center text-base leading-relaxed text-slate-300">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

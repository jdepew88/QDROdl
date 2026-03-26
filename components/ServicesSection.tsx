import React from "react";

export default function ServicesSection() {
  const services = [
    {
      title: "CalPERS",
      description:
        "California Public Employees' Retirement System benefit divisions with precise calculations",
    },
    {
      title: "CalSTRS",
      description:
        "California State Teachers' Retirement System pension and benefit divisions",
    },
    {
      title: "LACERA",
      description:
        "Los Angeles County Employees Retirement Association plan divisions",
    },
    {
      title: "Co LA Deferred Comp",
      description:
        "County of Los Angeles deferred compensation plan benefit divisions",
    },
    {
      title: "Motion Picture Plan",
      description:
        "Entertainment industry retirement plan divisions and survivor benefits",
    },
    {
      title: "Generic Defined Contribution",
      description:
        "Standard defined contribution plan divisions with precise benefit calculations",
    },
    {
      title: "Federal PLANS (FERS, CSRS, TSP)",
      description:
        "Federal employee retirement system divisions including TSP, FERS, and CSRS benefits",
    },
  ];

  return (
    <section id="services" className="py-24">
      <div className="px-6 py-0 mx-auto my-0 max-w-screen-lg">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-6xl leading-none font-[538] text-stone-50 max-sm:text-4xl">
            Our QDRO Services
          </h2>
          <p className="mx-auto my-0 text-xl max-w-[600px] text-slate-300 max-sm:text-lg">
            We specialize in preparing QDROs for these major retirement plan
            types
          </p>
        </div>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border-t border-solid bg-neutral-900 border-t-white border-t-opacity-10 duration-[0.3s] ease-[ease] transition-[background] hover:bg-neutral-800"
            >
              <h3 className="flex flex-col mb-4 text-xl font-[538] text-stone-50">
                <div className="mx-auto">{service.title}</div>
              </h3>
              <p className="text-base leading-relaxed text-slate-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

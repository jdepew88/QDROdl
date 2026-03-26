import React from "react";
import Link from "next/link";

export default function Footer() {
  const services = [
    "401(k) QDROs",
    "Pension QDROs",
    "Federal Plan QDROs",
    "403(b) QDROs",
    "457 Plan QDROs",
  ];

  const resources = [
    "Divorce Attorney Directory",
    "Asset Division Guide",
    "Retirement Planning Post-Divorce",
    "Legal Forms Library",
    "State Divorce Laws",
  ];

  const support = [
    "Contact Us",
    "FAQ",
    "Process Guide",
    "Document Templates",
    "Plan Administrator List",
  ];

  return (
    <footer className="pt-16 pb-8 border-t border-solid bg-stone-950 border-t-white border-t-opacity-10">
      <div className="px-6 py-0 mx-auto my-0 max-w-screen-lg">
        <div className="grid gap-12 mb-12 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div>
            <h3 className="mb-4 text-xl font-[538] text-stone-50">QDROdl</h3>
            <p className="text-base leading-relaxed text-neutral-400">
              Professional QDRO preparation services protecting your retirement
              assets during divorce.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-[538] text-stone-50">Services</h4>
            <ul className="p-0 m-0">
              {services.map((service, index) => (
                <li key={index} className="mb-2">
                  <a
                    className="text-base no-underline text-neutral-400 hover:text-slate-300"
                    href="#"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-[538] text-stone-50">
              Family Law Resources
            </h4>
            <ul className="p-0 m-0">
              {resources.map((resource, index) => (
                <li key={index} className="mb-2">
                  <a
                    className="text-base no-underline text-neutral-400 hover:text-slate-300"
                    href="#"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-[538] text-stone-50">Support</h4>
            <ul className="p-0 m-0">
              {support.map((item, index) => (
                <li key={index} className="mb-2">
                  <a
                    className="text-base no-underline text-neutral-400 hover:text-slate-300"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-between items-center pt-8 border-t border-solid border-t-white border-t-opacity-10">
          <p className="m-0 text-sm text-neutral-400">
            © 2025 QDROdl.app All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm no-underline text-neutral-400 hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/tos"
              className="text-sm no-underline text-neutral-400 hover:text-slate-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

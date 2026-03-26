"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PLAN_ROUTE_ENTRIES, planPath } from "@/data/planRoutes";

export default function Header() {
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-solid border-b-white border-opacity-10 bg-zinc-950 px-0 py-4 backdrop-blur-[10px]">
      <div className="mx-auto my-0 flex max-w-[1093px] items-center justify-between px-6 py-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg px-1 py-1 no-underline outline-none ring-offset-2 ring-offset-zinc-950 transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="QDROdl home"
        >
          <img
            alt=""
            src="https://cdn.builder.io/api/v1/image/assets%2F0a37ef2628f441d8abcf9454fa783c16%2F50d0002d6ef14114866bb8586826ccd0"
            className="aspect-square h-10 w-10 overflow-hidden object-contain"
          />
          <span className="text-2xl font-[538] text-stone-50">QDROdl</span>
        </Link>
        <nav className="flex items-center gap-7">
          <a href="/#services" className="text-base no-underline text-slate-300">
            Services
          </a>
          <div className="relative inline-block">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 border-none bg-transparent px-0 py-2 text-base text-slate-300"
              onClick={() => setShowPlansDropdown(!showPlansDropdown)}
              aria-expanded={showPlansDropdown}
              aria-haspopup="menu"
            >
              Plans
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-[0.3s] ease-[ease]"
                style={{
                  transform: showPlansDropdown
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="rgb(208, 214, 224)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {showPlansDropdown && (
              <div
                className="absolute left-0 top-full z-[1001] min-w-[220px] rounded-lg border border-solid border-white border-opacity-10 bg-neutral-900 px-0 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                role="menu"
              >
                <Link
                  href="/all_plans"
                  className="block px-4 py-2 text-sm no-underline text-slate-400 transition-colors hover:bg-white hover:bg-opacity-5"
                  onClick={() => setShowPlansDropdown(false)}
                  role="menuitem"
                >
                  View all plans
                </Link>
                {PLAN_ROUTE_ENTRIES.map((plan) => (
                  <Link
                    key={plan.slug}
                    href={planPath(plan.slug)}
                    className="block px-4 py-3 text-base no-underline text-slate-300 transition-[background-color] duration-[0.2s] ease-[ease] hover:bg-white hover:bg-opacity-5"
                    onClick={() => setShowPlansDropdown(false)}
                    role="menuitem"
                  >
                    {plan.navLabel}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a href="/#pricing" className="text-base no-underline text-slate-300">
            Pricing
          </a>
          <a
            href="/#testimonials"
            className="text-base no-underline text-slate-300"
          >
            Testimonials
          </a>
          <a href="/#faq" className="text-base no-underline text-slate-300">
            FAQ
          </a>
          <Link
            href="/get-started"
            className="rounded-lg border-none bg-neutral-200 px-6 py-3 text-base font-[510] no-underline text-zinc-950"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="mr-4 rounded-lg border-none bg-lime-800 px-6 py-3 text-base font-[510] text-stone-50 no-underline transition-[background-color] duration-[0.2s] ease-[ease] hover:bg-lime-700"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

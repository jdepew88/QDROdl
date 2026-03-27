"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLAN_ROUTE_ENTRIES, planPath } from "@/data/planRoutes";
import {
  HEADER_LOGO_BUILDER_SRC,
  HEADER_LOGO_HEIGHT,
  HEADER_LOGO_WIDTH,
} from "@/data/headerLogo";

export default function Header() {
  const pathname = usePathname();
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePlansOpen, setMobilePlansOpen] = useState(false);
  const plansMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobilePlansOpen(false);
    setShowPlansDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) {
        setMobileMenuOpen(false);
        setMobilePlansOpen(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!showPlansDropdown) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = plansMenuRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setShowPlansDropdown(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [showPlansDropdown]);

  useEffect(() => {
    if (!showPlansDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPlansDropdown(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showPlansDropdown]);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobilePlansOpen(false);
  };

  const mobileLinkClass =
    "block rounded-lg px-3 py-3 text-base text-slate-200 no-underline transition-colors hover:bg-white/10";

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-solid border-b-white border-opacity-10 bg-zinc-950 px-0 py-4 backdrop-blur-[10px]">
      <div className="mx-auto my-0 flex max-w-[1093px] items-center justify-between px-6 py-0">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg px-1 py-1 no-underline outline-none ring-offset-2 ring-offset-zinc-950 transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/40 md:flex-none"
          aria-label="QDROdl home"
          onClick={closeMobile}
        >
          <Image
            src={HEADER_LOGO_BUILDER_SRC}
            alt="QDROdl"
            width={HEADER_LOGO_WIDTH}
            height={HEADER_LOGO_HEIGHT}
            className="h-9 w-9 shrink-0 object-contain md:h-10 md:w-10"
            sizes="(max-width: 767px) 36px, 40px"
            priority
          />
          <span className="truncate text-xl font-[538] text-stone-50 md:text-2xl">
            QDROdl
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <a href="/#services" className="text-base no-underline text-slate-300">
            Services
          </a>
          <div ref={plansMenuRef} className="relative inline-block">
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
            href="/dash"
            className="rounded-lg px-3 py-2 text-base no-underline text-slate-300 transition-colors hover:bg-white/5"
          >
            Dashboard
          </Link>
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

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-stone-50 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          {mobileMenuOpen ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[calc(4rem+1px)] z-[998] bg-black/60 md:hidden"
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div
            id="mobile-nav-menu"
            className="relative z-[999] max-h-[min(78dvh,32rem)] overflow-y-auto border-t border-white/10 bg-neutral-950 px-4 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.45)] md:hidden"
          >
            <nav className="flex flex-col gap-0.5 pb-4" aria-label="Mobile">
              <a href="/#services" className={mobileLinkClass} onClick={closeMobile}>
                Services
              </a>

              <div className="border-b border-white/5 py-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base text-slate-200 hover:bg-white/10"
                  aria-expanded={mobilePlansOpen}
                  onClick={() => setMobilePlansOpen((o) => !o)}
                >
                  <span>Plans</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`shrink-0 transition-transform ${mobilePlansOpen ? "rotate-180" : ""}`}
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
                {mobilePlansOpen && (
                  <div className="ml-2 border-l border-white/10 pl-2">
                    <Link
                      href="/all_plans"
                      className={`${mobileLinkClass} text-sm text-slate-400`}
                      onClick={closeMobile}
                    >
                      View all plans
                    </Link>
                    {PLAN_ROUTE_ENTRIES.map((plan) => (
                      <Link
                        key={plan.slug}
                        href={planPath(plan.slug)}
                        className={`${mobileLinkClass} text-sm`}
                        onClick={closeMobile}
                      >
                        {plan.navLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a href="/#pricing" className={mobileLinkClass} onClick={closeMobile}>
                Pricing
              </a>
              <a
                href="/#testimonials"
                className={mobileLinkClass}
                onClick={closeMobile}
              >
                Testimonials
              </a>
              <a href="/#faq" className={mobileLinkClass} onClick={closeMobile}>
                FAQ
              </a>
              <Link href="/dash" className={mobileLinkClass} onClick={closeMobile}>
                Dashboard
              </Link>

              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                <Link
                  href="/get-started"
                  className="block rounded-xl bg-neutral-200 px-4 py-3 text-center text-base font-semibold text-zinc-950 no-underline"
                  onClick={closeMobile}
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="block rounded-xl bg-lime-800 px-4 py-3 text-center text-base font-semibold text-stone-50 no-underline hover:bg-lime-700"
                  onClick={closeMobile}
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

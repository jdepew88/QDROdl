"use client";
import { useState } from "react";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);
  const [dataBuilderList4] = useState([
    "Basic Plan",
    "Premium Plan",
    "Enterprise Plan",
  ]);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function togglePlansDropdown() {
    setShowPlansDropdown(!showPlansDropdown);
  }

  return (
    <header className="fixed right-0 left-px top-2.5 px-0 py-4 border-b border-solid backdrop-blur-[10px] bg-zinc-950 bg-opacity-90 border-b-white border-b-opacity-10 z-[1000]">
      <div className="flex justify-between items-center px-6 py-0 mx-auto my-0 max-w-[1093px]">
        <div className="flex gap-1.5 items-center">
          <img
            alt="QDROdl Logo"
            src="https://cdn.builder.io/api/v1/image/assets%2F0a37ef2628f441d8abcf9454fa783c16%2F784be3c4e3384c938973bb5706b79549"
            className="object-contain overflow-hidden w-10 h-10 aspect-square"
          />
          <span className="text-2xl font-[538] text-stone-50">QDROdl</span>
        </div>
        <nav className="flex gap-7 items-center">
          <a href="#services" className="text-base no-underline text-slate-300">
            Services
          </a>
          <div className="inline-block relative">
            <button
              className="flex gap-1 items-center px-0 py-2 text-base bg-transparent cursor-pointer border-[none] text-slate-300"
              onClick={togglePlansDropdown}
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
              <div className="absolute left-0 top-full px-0 py-2 rounded-lg border border-solid bg-neutral-900 border-white border-opacity-10 min-w-[200px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-[1001]">
                {dataBuilderList4?.map((plan, index) => (
                  <a
                    className="block px-4 py-3 text-base no-underline duration-[0.2s] ease-[ease] text-slate-300 transition-[background-color] hover:bg-white hover:bg-opacity-10"
                    key={index}
                    href={`#${plan.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setShowPlansDropdown(false)}
                  >
                    {plan}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#pricing" className="text-base no-underline text-slate-300">
            Pricing
          </a>
          <a href="#faq" className="text-base no-underline text-slate-300">
            FAQ
          </a>
          <button className="px-6 py-3 text-base rounded-lg cursor-pointer bg-neutral-200 border-[none] font-[510] text-zinc-950">
            Get Started
          </button>
          <button className="px-6 py-3 mr-4 text-base bg-lime-800 rounded-lg cursor-pointer border-[none] duration-[0.2s] ease-[ease] font-[510] text-stone-50 transition-[background-color] hover:bg-lime-700">
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}

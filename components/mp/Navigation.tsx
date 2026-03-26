"use client";
import { useState } from "react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navigation({
  activeSection,
  setActiveSection,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  function handleSetActiveSection(section: string) {
    setActiveSection(section);
    setMobileMenuOpen(false);
  }

  return (
    <nav className="fixed inset-x-0 top-0 border-b border-solid backdrop-blur-md bg-zinc-950 bg-opacity-90 border-b-white border-b-opacity-10 z-[1000]">
      <div className="flex justify-between items-center px-6 py-4 mx-auto my-0 max-w-[1187px]">
        <div className="flex gap-3 items-center">
          <img
            alt="LACERA Logo"
            src="https://cdn.builder.io/api/v1/image/assets%2F0a37ef2628f441d8abcf9454fa783c16%2F8f8aab5fbffe4d4c9d61f1e771dfc694"
            className="object-contain overflow-hidden w-10 h-10 aspect-square"
          />
          <span className="text-2xl font-[538] text-stone-50">
            <p>QDROdl</p>
          </span>
        </div>
        <div className="flex gap-8 items-center max-md:hidden">
          <a
            href="#division-methods"
            className="text-base no-underline text-slate-300"
          >
            Division Methods
          </a>
          <a
            href="#plan-types"
            className="text-base no-underline text-slate-300"
          >
            Plan Types
          </a>
          <a
            href="#qdro-process"
            className="text-base no-underline text-slate-300"
          >
            QDRO Process
          </a>
          <a
            href="#resources"
            className="text-base no-underline text-slate-300"
          >
            Resources
          </a>
          <button className="px-6 py-3 text-base rounded-lg cursor-pointer bg-neutral-200 border-[none] font-[510] text-zinc-950">
            Get Started
          </button>
          <button className="px-6 py-3 text-base bg-lime-800 rounded-lg cursor-pointer border-[none] duration-[0.2s] ease-[ease] font-[510] text-stone-50 transition-[background-color]">
            Login
          </button>
        </div>
        <button
          className="text-2xl text-white cursor-pointer border-[none] md:hidden"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>
      <div
        className="border-t border-solid bg-neutral-950 border-t-neutral-300 border-t-opacity-20"
        style={{
          display: mobileMenuOpen ? "block" : "none",
        }}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          <button
            className="px-0 py-2 text-sm font-medium text-left cursor-pointer border-[none]"
            onClick={() => handleSetActiveSection("overview")}
            style={{
              color:
                activeSection === "overview"
                  ? "rgb(72, 161, 255)"
                  : "rgb(214, 214, 214)",
            }}
          >
            Overview
          </button>
          <button
            className="px-0 py-2 text-sm font-medium text-left cursor-pointer border-[none]"
            onClick={() => handleSetActiveSection("deferred-comp")}
            style={{
              color:
                activeSection === "deferred-comp"
                  ? "rgb(72, 161, 255)"
                  : "rgb(214, 214, 214)",
            }}
          >
            Deferred Compensation
          </button>
          <button
            className="px-0 py-2 text-sm font-medium text-left cursor-pointer border-[none]"
            onClick={() => handleSetActiveSection("qdro")}
            style={{
              color:
                activeSection === "qdro"
                  ? "rgb(72, 161, 255)"
                  : "rgb(214, 214, 214)",
            }}
          >
            QDRO Process
          </button>
          <button
            className="px-0 py-2 text-sm font-medium text-left cursor-pointer border-[none]"
            onClick={() => handleSetActiveSection("resources")}
            style={{
              color:
                activeSection === "resources"
                  ? "rgb(72, 161, 255)"
                  : "rgb(214, 214, 214)",
            }}
          >
            Resources
          </button>
        </div>
      </div>
    </nav>
  );
}

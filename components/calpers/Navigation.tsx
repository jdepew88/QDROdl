"use client";
import { useState } from "react";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({
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
            alt="QDROdl Logo"
            src="https://images.pexels.com/photos/6077520/pexels-photo-6077520.jpeg"
            className="object-contain overflow-hidden w-10 h-10"
          />
          <span className="text-2xl font-[538] text-stone-50">QDROdl</span>
        </div>
        <div className="flex gap-8 items-center max-md:hidden">
          <a href="#services" className="text-base no-underline text-slate-300">
            Services
          </a>
          <a href="#pricing" className="text-base no-underline text-slate-300">
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-base no-underline text-slate-300"
          >
            Testimonials
          </a>
          <a href="#faq" className="text-base no-underline text-slate-300">
            FAQ
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
            onClick={() => handleSetActiveSection("retirement")}
            style={{
              color:
                activeSection === "retirement"
                  ? "rgb(72, 161, 255)"
                  : "rgb(214, 214, 214)",
            }}
          >
            Retirement Plans
          </button>
          <button
            className="px-0 py-2 text-sm font-medium text-left cursor-pointer border-[none]"
            onClick={() => handleSetActiveSection("dro")}
            style={{
              color:
                activeSection === "dro"
                  ? "rgb(72, 161, 255)"
                  : "rgb(214, 214, 214)",
            }}
          >
            DRO Process
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

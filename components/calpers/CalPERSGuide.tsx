"use client";
import { useState } from "react";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { OverviewSection } from "./OverviewSection";
import { DROModelsSection } from "./DROModelsSection";
import { ChoosingModelSection } from "./ChoosingModelSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

export default function CalPERSGuide() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div>
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="pt-32 min-h-screen bg-zinc-950">
        <HeroSection />

        <div className="px-6 pt-0 pb-24 mx-auto my-0 max-w-[1200px]">
          <OverviewSection />
          <DROModelsSection />
          <ChoosingModelSection />
          <CTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

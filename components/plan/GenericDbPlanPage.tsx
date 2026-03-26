"use client";

import HeroSection from "@/components/generic_db/HeroSection";
import IntroductionSection from "@/components/generic_db/IntroductionSection";
import ProcessSection from "@/components/generic_db/ProcessSection";
import BenefitsSection from "@/components/generic_db/BenefitsSection";
import CallToActionSection from "@/components/generic_db/CallToActionSection";

export default function GenericDbPlanPage() {
  return (
    <div className="w-full">
      <main className="min-h-screen bg-neutral-950 bg-opacity-80">
        <HeroSection />
        <div className="mx-auto my-0 max-w-[1200px] px-6 pb-24 pt-0">
          <IntroductionSection />
          <ProcessSection />
          <BenefitsSection />
          <CallToActionSection />
        </div>
      </main>
    </div>
  );
}

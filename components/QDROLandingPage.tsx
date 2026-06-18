"use client";

import React from "react";
import HeroSection from "./HeroSection";
import ProblemSolutionSection from "./home/ProblemSolutionSection";
import HowItWorksHomeSection from "./home/HowItWorksHomeSection";
import SupportedPlansHomeSection from "./home/SupportedPlansHomeSection";
import PricingSection from "./PricingSection";
import TrustCredibilitySection from "./home/TrustCredibilitySection";
import WhoItsForSection from "./home/WhoItsForSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";

export default function QDROLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <HowItWorksHomeSection />
        <SupportedPlansHomeSection />
        <PricingSection />
        <TrustCredibilitySection />
        <WhoItsForSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}

"use client";
import HeroSection from "./HeroSection";
import IntroductionSection from "./IntroductionSection";
import DistributionMethodsSection from "./DistributionMethodsSection";
import ChoosingMethodSection from "./ChoosingMethodSection";
import CallToActionSection from "./CallToActionSection";

export default function QDROGuide() {
  return (
    <div className="w-full">
      <main className="min-h-screen w-full bg-zinc-950 bg-opacity-80">
        <HeroSection />
        <div className="mx-auto my-0 max-w-[1200px] px-6 pb-24 pt-0">
          <IntroductionSection />
          <DistributionMethodsSection />
          <ChoosingMethodSection />
          <CallToActionSection />
        </div>
      </main>
    </div>
  );
}

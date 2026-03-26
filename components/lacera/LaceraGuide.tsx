import React from "react";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { IntroductionSection } from "./IntroductionSection";
import { MethodsSection } from "./MethodsSection";
import { ConsiderationsSection } from "./ConsiderationsSection";
import { CallToActionSection } from "./CallToActionSection";
import { Footer } from "./Footer";

export const LaceraGuide: React.FC = () => {
  return (
    <div>
      <Navigation />
      <div className="flex flex-row">
        <main className="pt-20 mb-52 min-h-screen bg-neutral-950 bg-opacity-80">
          <HeroSection />
          <div className="px-6 pt-0 pb-24 mx-auto my-0 max-w-[1200px]">
            <IntroductionSection />
            <MethodsSection />
            <ConsiderationsSection />
            <CallToActionSection />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LaceraGuide;

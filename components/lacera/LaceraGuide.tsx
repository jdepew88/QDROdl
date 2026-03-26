import React from "react";
import { HeroSection } from "./HeroSection";
import { IntroductionSection } from "./IntroductionSection";
import { MethodsSection } from "./MethodsSection";
import { ConsiderationsSection } from "./ConsiderationsSection";
import { CallToActionSection } from "./CallToActionSection";
import { Footer } from "./Footer";

export const LaceraGuide: React.FC = () => {
  return (
    <div>
      <main className="mb-52 min-h-screen bg-neutral-950 bg-opacity-80">
        <HeroSection />
        <div className="px-6 pt-0 pb-24 mx-auto my-0 max-w-[1200px]">
          <IntroductionSection />
          <MethodsSection />
          <ConsiderationsSection />
          <CallToActionSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LaceraGuide;

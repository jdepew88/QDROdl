import HeroSection from "./HeroSection";
import IntroductionSection from "./IntroductionSection";
import DROOptionsSection from "./DROOptionsSection";
import ChoosingModelSection from "./ChoosingModelSection";
import CallToActionSection from "./CallToActionSection";
import Footer from "./Footer";

interface CalSTRSGuideProps {}

export default function CalSTRSGuide({}: CalSTRSGuideProps) {
  return (
    <div>
      <main className="pb-52 -mb-px min-h-screen bg-neutral-950 bg-opacity-80">
        <HeroSection />
        <div className="px-6 pt-0 pb-24 mx-auto my-0 max-w-[1200px]">
          <IntroductionSection />
          <DROOptionsSection />
          <ChoosingModelSection />
          <CallToActionSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

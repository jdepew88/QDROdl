"use client";
import { useState } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import DistributionMethods from "./DistributionMethods";
import ChoosingMethod from "./ChoosingMethod";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

export default function QDROGuide() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div>
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex flex-row">
        <main className="pt-20 mb-52 min-h-screen bg-neutral-950 bg-opacity-80">
          <HeroSection />
          <div className="px-6 pt-0 pb-24 mx-auto my-0 max-w-[1200px]">
            <section className="mb-24">
              <div className="grid gap-16 items-center mb-16 grid-cols-[1fr_1fr] max-md:gap-10 max-md:grid-cols-[1fr]">
                <div>
                  <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
                    Understanding LA County Deferred Compensation QDROs
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-zinc-300">
                    When dividing Los Angeles County Deferred Compensation Plan
                    benefits during divorce, there are specific QDRO procedures
                    and distribution options available depending on the plan
                    type, vesting status, and the specific circumstances of the
                    case.
                  </p>
                  <p className="text-lg leading-relaxed text-zinc-300">
                    Each distribution method has distinct advantages, tax
                    implications, and requirements for both the participant and
                    the alternate payee. Understanding these options is crucial
                    for making informed decisions during divorce proceedings
                    involving Los Angeles County employees.
                  </p>
                </div>
                <div className="p-8 rounded-2xl border border-solid bg-zinc-500 bg-opacity-10 border-neutral-300 border-opacity-20">
                  <img
                    alt="Legal documents for deferred compensation QDRO"
                    src="https://images.pexels.com/photos/8441866/pexels-photo-8441866.jpeg"
                    className="object-cover overflow-hidden mb-6 w-full rounded-xl aspect-[1.1] h-[280px]"
                  />
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    Professional QDRO Expertise Required
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-300">
                    Deferred compensation QDRO division requires specialized
                    knowledge of ERISA regulations and tax implications. Always
                    consult with qualified attorneys experienced in LA County
                    deferred compensation QDROs and retirement plan divisions.
                  </p>
                </div>
              </div>
            </section>
            <DistributionMethods />
            <ChoosingMethod />
            <CallToAction />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

"use client";
import React from "react";
import HeroSection from "./HeroSection";
import WhatIsQDROSection from "./WhatIsQDROSection";
import ServicesSection from "./ServicesSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import DownloadsSection from "./DownloadsSection";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function QDROLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main>
        <HeroSection />
        <WhatIsQDROSection />
        <ServicesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <DownloadsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

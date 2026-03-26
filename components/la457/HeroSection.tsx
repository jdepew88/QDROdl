import * as React from "react";

function HeroSection() {
  return (
    <section className="w-full px-6 py-16 text-center bg-[linear-gradient(135deg,rgba(93,41,190,0.1),rgba(72,161,255,0.1))]">
      <div className="mx-auto my-0 max-w-[1200px]">
        <h1 className="mb-6 text-6xl font-bold leading-tight text-white max-md:text-4xl max-sm:text-3xl">
          LA County Deferred Compensation QDRO Guide
        </h1>
        <p className="mx-auto mt-0 mb-8 text-xl leading-relaxed max-w-[800px] text-zinc-300">
          Comprehensive guide to dividing Los Angeles County Deferred
          Compensation Plan benefits during divorce proceedings through
          Qualified Domestic Relations Orders (QDRO).
        </p>
        <div className="flex gap-4 justify-center mt-8 max-sm:flex-col max-sm:items-center">
          <div className="px-4 py-2 text-sm font-semibold text-blue-400 rounded-lg border border-solid bg-blue-400 bg-opacity-10 border-blue-400 border-opacity-30">
            457(b) Plan
          </div>
          <div className="px-4 py-2 text-sm font-semibold text-violet-800 rounded-lg border border-solid bg-violet-800 bg-opacity-10 border-violet-800 border-opacity-30">
            <div className="text-violet-500">401(a) Plan</div>
          </div>
          <div className="px-4 py-2 text-sm font-semibold text-green-400 rounded-lg border border-solid bg-green-400 bg-opacity-10 border-green-400 border-opacity-30">
            Roth Options
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

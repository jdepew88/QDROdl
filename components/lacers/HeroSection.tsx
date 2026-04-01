import React from "react";

export function HeroSection() {
  return (
    <section className="bg-[linear-gradient(135deg,rgba(93,41,190,0.1),rgba(72,161,255,0.1))] px-6 py-16 text-center">
      <div className="mx-auto my-0 max-w-[1200px]">
        <h1 className="mb-6 text-6xl font-[510] leading-[64px] tracking-tighter text-white max-md:text-5xl max-md:leading-10 max-md:tracking-tighter max-sm:text-4xl max-sm:leading-10 max-sm:tracking-tighter">
          The retirement system for LA City employees
        </h1>
        <p className="mx-auto mb-8 mt-0 max-w-[800px] text-2xl leading-8 tracking-tight text-neutral-400">
          Purpose-built for planning and securing your retirement. Designed for
          Los Angeles City employees and their future.
        </p>
        <div className="mt-8 flex justify-center gap-4 max-sm:flex-col max-sm:items-center">
          <div className="rounded-lg border border-solid border-blue-400 border-opacity-30 bg-blue-400 bg-opacity-10 px-4 py-2 text-sm font-semibold text-blue-400">
            Shared Interest
          </div>
          <div className="rounded-lg border border-solid border-violet-800 border-opacity-30 bg-violet-800 bg-opacity-10 px-4 py-2 text-sm font-semibold text-violet-500">
            Separate Interest
          </div>
          <div className="rounded-lg border border-solid border-green-400 border-opacity-30 bg-green-400 bg-opacity-10 px-4 py-2 text-sm font-semibold text-green-400">
            Lump Sum Distribution
          </div>
        </div>
      </div>
    </section>
  );
}

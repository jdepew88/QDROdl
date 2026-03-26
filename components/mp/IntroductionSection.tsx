import React from "react";

export default function IntroductionSection() {
  return (
    <section className="mb-24">
      <div className="mb-16 grid grid-cols-[1fr_1fr] items-center gap-16 max-md:grid-cols-[1fr] max-md:gap-10">
        <div>
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
            Understanding Motion Picture Industry QDROs
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            When dividing Motion Picture Industry Pension Plan and Individual
            Account Program benefits during divorce, a single unified QDRO can
            address both the defined benefit pension and the individual account
            components simultaneously.
          </p>
          <p className="text-lg leading-relaxed text-zinc-300">
            This unified approach streamlines the division process, reduces
            administrative complexity, and ensures consistent treatment across
            both plan components. Understanding the unique features of motion
            picture industry benefits is crucial for effective QDRO preparation.
          </p>
        </div>
        <div className="rounded-2xl border border-solid border-neutral-300 border-opacity-20 bg-zinc-500 bg-opacity-10 p-8">
          <img
            alt="Legal documents for deferred compensation QDRO"
            src="https://images.pexels.com/photos/8441866/pexels-photo-8441866.jpeg"
            className="mb-6 h-[280px] w-full overflow-hidden rounded-xl object-cover"
          />
          <h3 className="mb-3 text-xl font-semibold text-white">
            Motion Picture Industry QDRO Expertise
          </h3>
          <p className="text-base leading-relaxed text-zinc-300">
            Motion picture industry QDROs require specialized knowledge of
            entertainment industry pension structures, vesting schedules, and
            the unique interplay between defined benefit and individual account
            components. Professional expertise is essential for optimal
            outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}


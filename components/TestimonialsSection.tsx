import React from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Divorced Parent",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: "The QDRO process was seamless. They handled everything professionally and my retirement assets were protected exactly as ordered by the court.",
    },
    {
      name: "Michael Chen",
      role: "Federal Employee",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Their expertise with federal retirement plans was invaluable. The TSP division was completed without any complications or delays.",
    },
    {
      name: "Lisa Rodriguez",
      role: "Attorney",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      text: "I recommend QDRO Pro to all my divorce clients. Their documents are always court-ready and plan administrator approved.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 text-stone-50" id="testimonials">
      <div className="flex flex-col gap-8 items-center mx-auto max-w-screen-lg text-center">
        <div className="flex flex-col gap-6 items-center px-6">
          <h2 className="text-4xl leading-tight font-[538] max-w-[720px] text-stone-50">
            Trusted by families nationwide
          </h2>
          <p className="text-lg font-[510] max-w-[600px] text-slate-300">
            See how our QDRO services have helped protect retirement assets
            during divorce
          </p>
        </div>
        <div className="flex overflow-hidden relative flex-col justify-center items-center w-full">
          <div className="flex overflow-hidden flex-row gap-4 p-2">
            <div className="flex flex-row shrink-0 gap-4 justify-around animate-[40s_linear_infinite_marqueeSlide]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 max-w-xs text-left rounded-lg border-t border-solid border-t-white border-t-opacity-10 duration-[0.3s] ease-[ease] transition-[background] bg-neutral-900"
                >
                  <div className="flex gap-3 items-center">
                    <div className="flex overflow-hidden relative shrink-0 w-12 h-12 rounded-full">
                      <img
                        className="object-cover overflow-hidden aspect-square size-full"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg leading-none font-[538] text-stone-50">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-slate-300">
                    {testimonial.text}
                  </p>
                </div>
              ))}
              {testimonials.map((testimonial, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex flex-col p-6 max-w-xs text-left rounded-lg border-t border-solid border-t-white border-t-opacity-10 duration-[0.3s] ease-[ease] transition-[background] bg-neutral-900"
                >
                  <div className="flex gap-3 items-center">
                    <div className="flex overflow-hidden relative shrink-0 w-12 h-12 rounded-full">
                      <img
                        className="object-cover overflow-hidden aspect-square size-full"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg leading-none font-[538] text-stone-50">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-slate-300">
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marqueeSlide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

import React from "react";

interface DistributionMethodProps {
  methodNumber: string;
  title: string;
  description: string;
  bestFor: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  considerations?: {
    title: string;
    items: string[];
  };
  calculation?: {
    title: string;
    description: string;
  };
  colorScheme: "blue" | "violet" | "green";
}

export default function DistributionMethod({
  methodNumber,
  title,
  description,
  bestFor,
  features,
  considerations,
  calculation,
  colorScheme,
}: DistributionMethodProps) {
  const colorClasses = {
    blue: {
      border: "border-blue-400 border-opacity-20",
      bg: "bg-blue-400 bg-opacity-10",
      accent: "bg-blue-400",
      text: "text-blue-400",
      methodBg: "bg-blue-400",
      featureBg: "bg-blue-400 bg-opacity-10",
    },
    violet: {
      border: "border-violet-800 border-opacity-20",
      bg: "bg-violet-800 bg-opacity-10",
      accent: "bg-violet-800",
      text: "text-violet-800",
      methodBg: "bg-violet-800",
      featureBg: "bg-violet-800 bg-opacity-10",
    },
    green: {
      border: "border-green-400 border-opacity-20",
      bg: "bg-green-400 bg-opacity-10",
      accent: "bg-green-400",
      text: "text-green-400",
      methodBg: "bg-green-400",
      featureBg: "bg-green-400 bg-opacity-10",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`overflow-hidden relative rounded-3xl border-2 border-solid p-12 ${colors.bg} ${colors.border}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 ${colors.accent}`} />
      <div className="grid items-start grid-cols-[1fr_2fr] gap-12 max-md:grid-cols-[1fr] max-md:gap-8">
        <div>
          <div
            className={`mb-6 rounded-xl px-6 py-4 text-center text-lg font-semibold text-white ${colors.methodBg}`}
          >
            {methodNumber}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
            {title}
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
          <div className={`mb-6 rounded-xl p-5 ${colors.featureBg}`}>
            <h4 className={`mb-3 text-lg font-semibold ${colors.text}`}>
              Best For:
            </h4>
            <p className="text-base leading-relaxed text-zinc-300">{bestFor}</p>
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-xl font-semibold text-white">
            Key Features:
          </h4>
          {colorScheme === "violet" && (
            <div className="mb-8 rounded-2xl bg-white bg-opacity-10 p-8 text-center">
              <h5 className="mb-4 text-xl font-semibold text-white">
                Shared Interest in Both Plan Components
              </h5>
              <div className="rounded-lg bg-black bg-opacity-30 p-5 text-lg leading-relaxed text-zinc-300">
                Alternate payee maintains rights to future defined benefit
                pension payments
                <br />
                Retains shared interest in Individual Account Program growth and
                distributions
              </div>
            </div>
          )}
          <div className="mb-8 grid grid-cols-[1fr_1fr] gap-6 max-sm:grid-cols-[1fr]">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl bg-white bg-opacity-10 p-5">
                <h5 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h5>
                <p className="text-sm leading-normal text-zinc-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {considerations && (
            <div className="mb-6 rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-0 p-6">
              <h5 className="mb-3 text-lg font-semibold text-white">
                {considerations.title}
              </h5>
              <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                {considerations.items.map((item, index) => (
                  <li
                    key={index}
                    className={
                      index < considerations.items.length - 1 ? "mb-2" : ""
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {calculation && (
            <div className={`rounded-xl p-6 ${colors.featureBg}`}>
              <h5 className={`mb-3 text-lg font-semibold ${colors.text}`}>
                {calculation.title}
              </h5>
              <p className="text-base leading-relaxed text-zinc-300">
                {calculation.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


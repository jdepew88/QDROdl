import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface DivisionMethodProps {
  methodNumber: string;
  title: string;
  description: string;
  bestFor: string;
  features: Feature[];
  considerations?: string[];
  colorScheme: "blue" | "violet" | "green";
  additionalContent?: React.ReactNode;
}

export function DivisionMethod({
  methodNumber,
  title,
  description,
  bestFor,
  features,
  considerations,
  colorScheme,
  additionalContent,
}: DivisionMethodProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-400 bg-opacity-10",
      border: "border-blue-400 border-opacity-20",
      accent: "bg-blue-400",
      text: "text-blue-400",
      methodBg: "bg-blue-400",
    },
    violet: {
      bg: "bg-violet-800 bg-opacity-10",
      border: "border-violet-800 border-opacity-20",
      accent: "bg-violet-800",
      text: "text-violet-300",
      methodBg: "bg-violet-800",
    },
    green: {
      bg: "bg-green-400 bg-opacity-10",
      border: "border-green-400 border-opacity-20",
      accent: "bg-green-400",
      text: "text-green-400",
      methodBg: "bg-green-400",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 border-solid p-12 ${colors.bg} ${colors.border}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 ${colors.accent}`} />
      <div className="grid grid-cols-[1fr_2fr] items-start gap-12 max-md:grid-cols-[1fr] max-md:gap-8">
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
          <div className={`mb-6 rounded-xl p-5 ${colors.bg}`}>
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
          {additionalContent && <div className="mb-8">{additionalContent}</div>}
          <div className="mb-8 grid grid-cols-[1fr_1fr] gap-6 max-sm:grid-cols-[1fr]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white bg-opacity-10 p-5"
              >
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
            <div className="rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-0 p-6">
              <h5 className="mb-3 text-lg font-semibold text-white">
                Important Considerations:
              </h5>
              <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                {considerations.map((consideration, index) => (
                  <li
                    key={index}
                    className={index < considerations.length - 1 ? "mb-2" : ""}
                  >
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

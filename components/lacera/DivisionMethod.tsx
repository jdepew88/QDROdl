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
  additionalContent?: React.ReactNode;
  colorScheme: "blue" | "violet" | "green";
}

export const DivisionMethod: React.FC<DivisionMethodProps> = ({
  methodNumber,
  title,
  description,
  bestFor,
  features,
  considerations,
  additionalContent,
  colorScheme,
}) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-400 bg-opacity-10",
      border: "border-blue-400 border-opacity-20",
      accent: "bg-blue-400",
      text: "text-blue-400",
      methodBg: "bg-blue-400",
      bestForBg: "bg-blue-400 bg-opacity-10",
    },
    violet: {
      bg: "bg-violet-800 bg-opacity-10",
      border: "border-violet-800 border-opacity-20",
      accent: "bg-violet-800",
      text: "text-violet-800",
      methodBg: "bg-violet-800",
      bestForBg: "bg-violet-800 bg-opacity-10",
    },
    green: {
      bg: "bg-green-400 bg-opacity-10",
      border: "border-green-400 border-opacity-20",
      accent: "bg-green-400",
      text: "text-green-400",
      methodBg: "bg-green-400",
      bestForBg: "bg-green-400 bg-opacity-10",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`overflow-hidden relative p-12 rounded-3xl border-2 border-solid ${colors.bg} ${colors.border}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 ${colors.accent}`} />
      <div className="grid gap-12 items-start grid-cols-[1fr_2fr] max-md:gap-8 max-md:grid-cols-[1fr]">
        <div>
          <div
            className={`px-6 py-4 mb-6 text-lg font-semibold text-center text-white ${colors.methodBg} rounded-xl`}
          >
            {methodNumber}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
            {title}
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
          <div className={`p-5 mb-6 rounded-xl ${colors.bestForBg}`}>
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
          {additionalContent}
          <div className="grid gap-6 mb-8 grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-white bg-opacity-10"
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
            <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
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
};

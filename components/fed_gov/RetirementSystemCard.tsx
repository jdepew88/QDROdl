import React from "react";

interface FeatureProps {
  title: string;
  description: string;
}

interface RetirementSystemCardProps {
  type: "FERS" | "MODEL B" | "MODEL C";
  title: string;
  description: string;
  coverInfo: {
    title: string;
    description: string;
  };
  features: FeatureProps[];
  additionalContent?: React.ReactNode;
  colorScheme: "blue" | "violet" | "green";
}

function FeatureCard({ title, description }: FeatureProps) {
  return (
    <div className="rounded-xl bg-white bg-opacity-10 p-5">
      <h5 className="mb-2 text-lg font-semibold text-white">{title}</h5>
      <p className="text-sm leading-normal text-zinc-300">{description}</p>
    </div>
  );
}

export function RetirementSystemCard({
  type,
  title,
  description,
  coverInfo,
  features,
  additionalContent,
  colorScheme,
}: RetirementSystemCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-400 bg-opacity-10",
      border: "border-blue-400 border-opacity-20",
      accent: "bg-blue-400",
      tag: "bg-blue-400",
      text: "text-blue-400",
    },
    violet: {
      bg: "bg-violet-800 bg-opacity-10",
      border: "border-violet-800 border-opacity-20",
      accent: "bg-violet-800",
      tag: "bg-violet-800",
      text: "text-violet-800",
    },
    green: {
      bg: "bg-green-400 bg-opacity-10",
      border: "border-green-400 border-opacity-20",
      accent: "bg-green-400",
      tag: "bg-green-400",
      text: "text-green-400",
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
            className={`mb-6 rounded-xl px-6 py-4 text-center text-lg font-semibold text-white ${colors.tag}`}
          >
            {type}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
            {title}
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
          <div className={`mb-6 rounded-xl ${colors.bg} p-5`}>
            <h4 className={`mb-3 text-lg font-semibold ${colors.text}`}>
              {coverInfo.title}
            </h4>
            <p className="text-base leading-relaxed text-zinc-300">
              {coverInfo.description}
            </p>
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-xl font-semibold text-white">
            Key Features:
          </h4>
          <div className="mb-8 grid grid-cols-[1fr_1fr] gap-6 max-sm:grid-cols-[1fr]">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          {additionalContent}
        </div>
      </div>
    </div>
  );
}


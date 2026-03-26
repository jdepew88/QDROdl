import * as React from "react";

interface Feature {
  title: string;
  description: string;
}

interface Method {
  id: string;
  methodNumber: string;
  title: string;
  description: string;
  bestFor: string;
  colorScheme: string;
  features: Feature[];
  considerations?: string[];
  specialContent?: {
    title: string;
    description: string;
  };
  requirements?: string;
  requirementDetail?: string;
  calculationMethod?: {
    title: string;
    description: string;
  };
}

interface DistributionMethodCardProps {
  method: Method;
}

function DistributionMethodCard({ method }: DistributionMethodCardProps) {
  const getColorClasses = (scheme: string) => {
    switch (scheme) {
      case "blue":
        return {
          border: "border-blue-400 border-opacity-20",
          bg: "bg-blue-400 bg-opacity-10",
          accent: "bg-blue-400",
          text: "text-blue-400",
          buttonBg: "bg-blue-400",
          specialBg: "bg-blue-400 bg-opacity-10",
        };
      case "violet":
        return {
          border: "border-violet-800 border-opacity-20",
          bg: "bg-violet-800 bg-opacity-10",
          accent: "bg-violet-800",
          text: "text-violet-800",
          buttonBg: "bg-violet-800",
          specialBg: "bg-violet-800 bg-opacity-10",
        };
      case "green":
        return {
          border: "border-green-400 border-opacity-20",
          bg: "bg-green-400 bg-opacity-10",
          accent: "bg-green-400",
          text: "text-green-400",
          buttonBg: "bg-green-400",
          specialBg: "bg-green-400 bg-opacity-10",
        };
      default:
        return {
          border: "border-blue-400 border-opacity-20",
          bg: "bg-blue-400 bg-opacity-10",
          accent: "bg-blue-400",
          text: "text-blue-400",
          buttonBg: "bg-blue-400",
          specialBg: "bg-blue-400 bg-opacity-10",
        };
    }
  };

  const colors = getColorClasses(method.colorScheme);

  return (
    <div
      className={`overflow-hidden relative p-12 rounded-3xl border-2 border-solid ${colors.bg} ${colors.border}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 ${colors.accent}`} />
      <div className="grid gap-12 items-start grid-cols-[1fr_2fr] max-md:gap-8 max-md:grid-cols-[1fr]">
        <div>
          <div
            className={`px-6 py-4 mb-6 text-lg font-semibold text-center text-white ${colors.buttonBg} rounded-xl`}
          >
            {method.methodNumber}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
            {method.title}
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            {method.description}
          </p>
          <div className={`p-5 mb-6 rounded-xl ${colors.specialBg}`}>
            <h4 className={`mb-3 text-lg font-semibold ${colors.text}`}>
              Best For:
            </h4>
            <p className="text-base leading-relaxed text-zinc-300">
              {method.bestFor}
            </p>
          </div>
        </div>
        <div>
          <h4 className="mb-5 text-xl font-semibold text-white">
            Key Features:
          </h4>

          {method.specialContent && (
            <div className="p-8 mb-8 text-center rounded-2xl bg-white bg-opacity-10">
              <h5 className="mb-4 text-xl font-semibold text-white">
                {method.specialContent.title}
              </h5>
              <div className="p-5 text-lg leading-relaxed rounded-lg bg-black bg-opacity-30 text-zinc-300">
                {method.specialContent.description
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index <
                        method.specialContent!.description.split("\n").length -
                          1 && <br />}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          )}

          <div className="grid gap-6 mb-8 grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr]">
            {method.features.map((feature, index) => (
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

          {method.considerations && (
            <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
              <h5 className="mb-3 text-lg font-semibold text-white">
                Important Considerations:
              </h5>
              <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                {method.considerations.map((consideration, index) => (
                  <li key={index} className="mb-2">
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {method.requirements && (
            <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
              <h5 className="mb-3 text-lg font-semibold text-white">
                Important Requirements:
              </h5>
              <p className="mb-3 text-base leading-relaxed text-zinc-300">
                {method.requirements}
              </p>
              <p className="p-3 text-base leading-relaxed rounded-md bg-black bg-opacity-30 text-zinc-300">
                {method.requirementDetail}
              </p>
            </div>
          )}

          {method.calculationMethod && (
            <div className={`p-6 rounded-xl ${colors.specialBg}`}>
              <h5 className={`mb-3 text-lg font-semibold ${colors.text}`}>
                {method.calculationMethod.title}
              </h5>
              <p className="text-base leading-relaxed text-zinc-300">
                {method.calculationMethod.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DistributionMethodCard;

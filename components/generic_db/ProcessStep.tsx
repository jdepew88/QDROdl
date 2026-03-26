import React from "react";

interface ProcessStepProps {
  stepNumber: string;
  title: string;
  description: string;
  formula?: {
    title: string;
    content: string;
  };
  keyComponents?: Array<{
    title: string;
    description: string;
  }>;
  advantages?: string[];
  centerContent?: {
    title: string;
    description: string;
  };
  requirements?: string[];
  qualityAssurance?: string;
  colorScheme: "blue" | "violet" | "green";
}

export default function ProcessStep({
  stepNumber,
  title,
  description,
  formula,
  keyComponents,
  advantages,
  centerContent,
  requirements,
  qualityAssurance,
  colorScheme,
}: ProcessStepProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-400 bg-opacity-10",
      border: "border-blue-400 border-opacity-20",
      accent: "bg-blue-400",
      text: "text-blue-400",
      stepBg: "bg-blue-400",
    },
    violet: {
      bg: "bg-violet-800 bg-opacity-10",
      border: "border-violet-800 border-opacity-20",
      accent: "bg-violet-800",
      text: "text-violet-800",
      stepBg: "bg-violet-800",
    },
    green: {
      bg: "bg-green-400 bg-opacity-10",
      border: "border-green-400 border-opacity-20",
      accent: "bg-green-400",
      text: "text-green-400",
      stepBg: "bg-green-400",
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
            className={`mb-6 rounded-xl px-6 py-4 text-center text-lg font-semibold text-white ${colors.stepBg}`}
          >
            {stepNumber}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
            {title}
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
          {formula && (
            <div className={`mb-6 rounded-xl p-5 ${colors.bg}`}>
              <h4 className={`mb-3 text-lg font-semibold ${colors.text}`}>
                {formula.title}
              </h4>
              <p className="text-base leading-relaxed text-zinc-300">
                {formula.content}
              </p>
            </div>
          )}
        </div>
        <div>
          {keyComponents && (
            <>
              <h4 className="mb-5 text-xl font-semibold text-white">
                Key Components:
              </h4>
              <div className="mb-8 grid grid-cols-[1fr_1fr] gap-6 max-sm:grid-cols-[1fr]">
                {keyComponents.map((component, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white bg-opacity-10 p-5"
                  >
                    <h5 className="mb-2 text-lg font-semibold text-white">
                      {component.title}
                    </h5>
                    <p className="text-sm leading-normal text-zinc-300">
                      {component.description}
                    </p>
                  </div>
                ))}
              </div>
              {advantages && (
                <div className="rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-0 p-6">
                  <h5 className="mb-3 text-lg font-semibold text-white">
                    Time Rule Advantages:
                  </h5>
                  <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                    {advantages.map((advantage, index) => (
                      <li
                        key={index}
                        className={index < advantages.length - 1 ? "mb-2" : ""}
                      >
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {centerContent && (
            <>
              <h4 className="mb-5 text-xl font-semibold text-white">
                Administrator Research Process:
              </h4>
              <div className="mb-8 rounded-2xl bg-white bg-opacity-10 p-8 text-center">
                <h5 className="mb-4 text-xl font-semibold text-white">
                  {centerContent.title}
                </h5>
                <div className="rounded-lg bg-black bg-opacity-30 p-5 text-lg leading-relaxed text-zinc-300">
                  {centerContent.description}
                </div>
              </div>
              <div className="rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-0 p-6">
                <h5 className="mb-3 text-lg font-semibold text-white">
                  Common Administrator Types:
                </h5>
                <p className="mb-3 text-base leading-relaxed text-zinc-300">
                  Third-party administrators, insurance companies, or employer
                  HR departments:
                </p>
                <p className="rounded-md bg-black bg-opacity-30 p-3 text-base leading-relaxed text-zinc-300">
                  Each has unique QDRO requirements and submission procedures
                </p>
              </div>
            </>
          )}

          {requirements && (
            <>
              <h4 className="mb-5 text-xl font-semibold text-white">
                QDRO Components:
              </h4>
              <div className="mb-8 grid grid-cols-[1fr_1fr] gap-6 max-sm:grid-cols-[1fr]">
                {keyComponents?.map((component, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white bg-opacity-10 p-5"
                  >
                    <h5 className="mb-2 text-lg font-semibold text-white">
                      {component.title}
                    </h5>
                    <p className="text-sm leading-normal text-zinc-300">
                      {component.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-6 rounded-xl border border-solid border-white border-opacity-10 bg-white bg-opacity-0 p-6">
                <h5 className="mb-3 text-lg font-semibold text-white">
                  Required Information:
                </h5>
                <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                  {requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className={index < requirements.length - 1 ? "mb-2" : ""}
                    >
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
              {qualityAssurance && (
                <div className={`rounded-xl p-6 ${colors.bg}`}>
                  <h5 className={`mb-3 text-lg font-semibold ${colors.text}`}>
                    Quality Assurance:
                  </h5>
                  <p className="text-base leading-relaxed text-zinc-300">
                    {qualityAssurance}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}


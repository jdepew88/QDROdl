interface DistributionMethodCardProps {
  methodNumber: string;
  title: string;
  description: string;
  bestFor: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  considerations?: string[];
  calculationMethod?: string;
  colorScheme: "blue" | "violet" | "green";
}

export default function DistributionMethodCard({
  methodNumber,
  title,
  description,
  bestFor,
  features,
  considerations,
  calculationMethod,
  colorScheme,
}: DistributionMethodCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-400 bg-opacity-10",
      border: "border-blue-400 border-opacity-20",
      accent: "bg-blue-400",
      text: "text-blue-400",
      button: "bg-blue-400",
    },
    violet: {
      bg: "bg-violet-800 bg-opacity-10",
      border: "border-violet-800 border-opacity-20",
      accent: "bg-violet-800",
      text: "text-violet-800",
      button: "bg-violet-800",
    },
    green: {
      bg: "bg-green-400 bg-opacity-10",
      border: "border-green-400 border-opacity-20",
      accent: "bg-green-400",
      text: "text-green-400",
      button: "bg-green-400",
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
            className={`px-6 py-4 mb-6 text-lg font-semibold text-center text-white ${colors.button} rounded-xl`}
          >
            {methodNumber}
          </div>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
            {title}
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
          <div className={`p-5 mb-6 rounded-xl ${colors.bg}`}>
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
            <div className="p-8 mb-8 text-center rounded-2xl bg-white bg-opacity-10">
              <h5 className="mb-4 text-xl font-semibold text-white">
                Independent Deferred Compensation Account
              </h5>
              <div className="p-5 text-lg leading-relaxed rounded-lg bg-black bg-opacity-30 text-zinc-300">
                Alternate payee becomes a plan participant with their own
                account
                <br />
                Can make independent investment and distribution elections
              </div>
            </div>
          )}
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
            <div className="p-6 mb-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
              <h5 className="mb-3 text-lg font-semibold text-white">
                Important Considerations:
              </h5>
              <ul className="pl-5 text-base leading-relaxed text-zinc-300">
                {considerations.map((consideration, index) => (
                  <li key={index} className="mb-2">
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {colorScheme === "violet" && (
            <div className="p-6 rounded-xl border border-solid bg-white bg-opacity-0 border-white border-opacity-10">
              <h5 className="mb-3 text-lg font-semibold text-white">
                Important Requirements:
              </h5>
              <p className="mb-3 text-base leading-relaxed text-zinc-300">
                Plan must allow for separate account maintenance:
              </p>
              <p className="p-3 text-base leading-relaxed rounded-md bg-black bg-opacity-30 text-zinc-300">
                Alternate payee becomes a plan participant with all associated
                rights and responsibilities
              </p>
            </div>
          )}
          {calculationMethod && (
            <div className={`p-6 rounded-xl ${colors.bg}`}>
              <h5 className={`mb-3 text-lg font-semibold ${colors.text}`}>
                Calculation Method:
              </h5>
              <p className="text-base leading-relaxed text-zinc-300">
                {calculationMethod}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

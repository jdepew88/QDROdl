interface ModelCardProps {
  model: string;
  title: string;
  description: string;
  bestFor: string;
  colorScheme: "blue" | "violet" | "green";
  children: React.ReactNode;
}

export function ModelCard({
  model,
  title,
  description,
  bestFor,
  colorScheme,
  children,
}: ModelCardProps) {
  const colorClasses = {
    blue: {
      border: "border-blue-400 border-opacity-20",
      bg: "bg-blue-400 bg-opacity-10",
      accent: "bg-blue-400",
      badge: "bg-blue-400",
      text: "text-blue-400",
      bestForBg: "bg-blue-400 bg-opacity-10",
    },
    violet: {
      border: "border-violet-800 border-opacity-20",
      bg: "bg-violet-800 bg-opacity-10",
      accent: "bg-violet-800",
      badge: "bg-violet-800",
      text: "text-violet-800",
      bestForBg: "bg-violet-800 bg-opacity-10",
    },
    green: {
      border: "border-green-400 border-opacity-20",
      bg: "bg-green-400 bg-opacity-10",
      accent: "bg-green-400",
      badge: "bg-green-400",
      text: "text-green-400",
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
            className={`px-6 py-4 mb-6 text-lg font-semibold text-center text-white ${colors.badge} rounded-xl`}
          >
            {model}
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
        <div>{children}</div>
      </div>
    </div>
  );
}

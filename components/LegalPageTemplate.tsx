import Link from "next/link";
import React from "react";

type LegalPageTemplateProps = {
  title: string;
  children: React.ReactNode;
};

/**
 * Shared shell for legal pages (privacy, terms): dark theme, readable width, back link.
 * Site footer comes from root layout.
 */
export default function LegalPageTemplate({
  title,
  children,
}: LegalPageTemplateProps) {
  return (
    <div className="min-h-screen bg-zinc-950 pb-8">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-8">
          <Link
            href="/"
            className="text-sm text-slate-400 no-underline transition-colors hover:text-stone-50"
          >
            ← Back to home
          </Link>
        </p>
        <h1 className="mb-10 text-4xl font-[538] leading-tight text-stone-50">
          {title}
        </h1>
        <article className="space-y-8 text-base leading-relaxed text-slate-300 [&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:text-xl [&_h2]:font-[538] [&_h2]:text-stone-50 [&_h2]:first:mt-0 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_strong]:font-[510] [&_strong]:text-stone-50">
          {children}
        </article>
      </main>
    </div>
  );
}

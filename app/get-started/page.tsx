import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get started",
  description: "Start your QDRO with QDROdl.",
};

export default function GetStartedPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Get started</h1>
      <p className="mt-4 text-zinc-600">
        A dedicated onboarding flow will live here. For now, begin with plan
        selection and intake.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Link
          href="/intake/plans"
          className="inline-flex w-fit rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Start intake
        </Link>
        <Link
          href="/all_plans"
          className="inline-flex w-fit text-sm font-medium text-lime-800 underline-offset-4 hover:underline"
        >
          Browse all plans
        </Link>
      </div>
    </main>
  );
}

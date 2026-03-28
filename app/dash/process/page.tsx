import Link from "next/link";
import ProcessOverviewContent from "@/components/process/ProcessOverviewContent";

export default function DashProcessPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 lg:px-10 lg:py-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Process
      </p>
      <p className="mt-2 text-sm text-zinc-400">
        <Link href="/dash" className="text-lime-400 hover:underline">
          Back to overview
        </Link>
      </p>
      <div className="mt-6">
        <ProcessOverviewContent />
      </div>
    </main>
  );
}

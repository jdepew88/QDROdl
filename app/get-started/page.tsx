import type { Metadata } from "next";
import ProcessOverviewContent from "@/components/process/ProcessOverviewContent";

export const metadata: Metadata = {
  title: "Get started",
  description: "Understand the QDROdl process from intake through service.",
};

export default function GetStartedPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <ProcessOverviewContent />
    </main>
  );
}

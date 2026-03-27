import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Verify your QDROdl account email address.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-md px-4 py-16 text-zinc-300">Verifying...</main>}>
      <VerifyEmailClient />
    </Suspense>
  );
}


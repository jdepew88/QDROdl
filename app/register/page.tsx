import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your QDROdl login to start intake.",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={<main className="mx-auto max-w-md px-4 py-16 text-zinc-300">Loading...</main>}
    >
      <RegisterClient />
    </Suspense>
  );
}


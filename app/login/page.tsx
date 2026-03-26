import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your QDROdl account.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={<main className="mx-auto max-w-md px-4 py-16 text-zinc-300">Loading...</main>}
    >
      <LoginClient />
    </Suspense>
  );
}

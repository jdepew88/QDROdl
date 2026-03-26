import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your QDROdl account (coming soon).",
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Login</h1>
      <p className="mt-4 text-zinc-600">
        Client sign-in and the dashboard are not wired up yet. This page is a
        placeholder so navigation and bookmarks use a stable URL.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="font-medium text-lime-800 underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </p>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        const j = await res.json();
        if (j?.email) setEmail(j.email);
      } catch {
        setEmail(null);
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 lg:px-10 lg:py-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Profile
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-stone-50">
        Account information
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        <Link href="/dash" className="text-lime-400 hover:underline">
          Back to overview
        </Link>
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div>
          <label className="text-xs font-medium text-zinc-500">Login email</label>
          <p className="mt-1 text-stone-100">{email || "—"}</p>
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-500">
            Display name (coming soon)
          </label>
          <p className="mt-1 text-sm text-zinc-500">
            Stored profile fields will appear here for personalization and
            receipts.
          </p>
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-500">
            Phone / firm (coming soon)
          </label>
          <p className="mt-1 text-sm text-zinc-500">
            Optional contact details for billing and support.
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Me = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  emailVerified: boolean;
};

export default function ProfilePage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const j = await res.json();
        if (!cancelled) {
          setMe({
            email: j?.email ?? null,
            firstName: j?.firstName ?? null,
            lastName: j?.lastName ?? null,
            phone: j?.phone ?? null,
            emailVerified: Boolean(j?.emailVerified),
          });
        }
      } catch {
        if (!cancelled) setMe(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fullName =
    me?.firstName || me?.lastName
      ? [me.firstName, me.lastName].filter(Boolean).join(" ")
      : null;

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

      {loading && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-400">
          Loading…
        </div>
      )}

      {!loading && (
        <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div>
            <label className="text-xs font-medium text-zinc-500">Name</label>
            <p className="mt-1 text-stone-100">{fullName || "—"}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500">Phone</label>
            <p className="mt-1 text-stone-100">{me?.phone || "—"}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500">Login email</label>
            <p className="mt-1 text-stone-100">{me?.email || "—"}</p>
            <p className="mt-2 text-xs text-zinc-500">
              {me?.emailVerified ? (
                <span className="text-emerald-400/90">Email verified</span>
              ) : (
                <span>Email not verified — check your inbox or sign in from login to resend.</span>
              )}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

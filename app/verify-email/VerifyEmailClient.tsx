"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Props = {
  token?: string;
};

export default function VerifyEmailClient({ token = "" }: Props) {
  const hasToken = useMemo(() => token.length > 0, [token]);

  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!hasToken) {
        setStatus("error");
        setMessage("Missing verification token.");
        return;
      }
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok) throw new Error(json?.error || "Verification failed.");
        if (!cancelled) {
          setStatus("ok");
          setMessage("Email verified. You can now sign in.");
        }
      } catch (e: any) {
        if (!cancelled) {
          setStatus("error");
          setMessage(e?.message || "Verification failed.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [hasToken, token]);

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-stone-50">Verify email</h1>
        <p className="mt-3 text-sm text-zinc-300">{message}</p>

        <div className="mt-5">
          {status === "loading" && <p className="text-sm text-zinc-400">Please wait...</p>}
          {status === "ok" && (
            <Link href="/login" className="inline-block rounded-xl bg-lime-800 px-4 py-3 text-sm font-semibold text-white hover:bg-lime-700">
              Go to login
            </Link>
          )}
          {status === "error" && (
            <Link href="/register" className="inline-block rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10">
              Back to register
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}


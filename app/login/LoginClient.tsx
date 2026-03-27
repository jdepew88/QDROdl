"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dash";
  const safeNext = useMemo(() => (next.startsWith("/") ? next : "/dash"), [next]);
  const registered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNeedsVerification(false);
    setResendMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text().catch(() => "");
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }

      if (!res.ok) {
        const msg = json?.error || `Login failed (HTTP ${res.status})`;
        if (String(msg).toLowerCase().includes("verify your email")) {
          setNeedsVerification(true);
        }
        throw new Error(msg);
      }

      router.push(safeNext);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    if (!email || resending) return;
    setResending(true);
    setResendMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const text = await res.text().catch(() => "");
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }
      if (!res.ok) throw new Error(json?.error || "Could not resend verification email.");
      setResendMessage(json?.message || "Verification email sent.");
    } catch (e: any) {
      setError(e?.message || "Could not resend verification email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold text-stone-50">Login</h1>
        <p className="mt-2 text-sm text-zinc-300">
          Sign in to access your dashboard and documents.
        </p>
        {registered && (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            Thanks for registering. Check your email and verify your address before signing in.
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 placeholder:text-zinc-500 focus:ring-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 placeholder:text-zinc-500 focus:ring-2"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}
          {resendMessage && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
              {resendMessage}
            </div>
          )}
          {needsVerification && (
            <button
              type="button"
              onClick={onResend}
              disabled={!email || resending}
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resending ? "Sending..." : "Resend verification email"}
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-lime-800 px-4 py-3 text-sm font-semibold text-stone-50 hover:bg-lime-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-5 text-sm text-zinc-300">
          Need to start a new matter?{" "}
          <Link href="/intake/plans" className="text-lime-400 hover:underline">
            Go to intake
          </Link>
        </div>
        <div className="mt-2 text-sm text-zinc-300">
          New here?{" "}
          <Link
            href={`/register?next=${encodeURIComponent(safeNext)}`}
            className="text-lime-400 hover:underline"
          >
            Create a login
          </Link>
        </div>
      </div>
    </main>
  );
}


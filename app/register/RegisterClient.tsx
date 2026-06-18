"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { formatUsPhoneInput } from "@/lib/phoneUs";

type Props = {
  next?: string;
};

export default function RegisterClient({ next = "/dash" }: Props) {
  const router = useRouter();
  const safeNext = useMemo(() => (next.startsWith("/") ? next : "/dash"), [next]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const phoneDisplay = formatUsPhoneInput(phoneDigits);

  const onPhoneChange = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    setPhoneDigits(d);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (phoneDigits.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phoneDigits,
          email,
          password,
        }),
      });
      const text = await res.text().catch(() => "");
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }
      if (!res.ok) throw new Error(json?.error || `Register failed (HTTP ${res.status})`);
      setSuccess(
        String(
          json?.message ||
            "Thanks for registering. Please verify your email, then sign in.",
        ),
      );
      router.push(`/login?registered=1&next=${encodeURIComponent(safeNext)}`);
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold text-stone-50">Create your login</h1>
        <p className="mt-2 text-sm text-zinc-300">
          Register once, then continue your intake from the dashboard.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-zinc-300">First name</label>
              <input
                type="text"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 focus:ring-2"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">Last name</label>
              <input
                type="text"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 focus:ring-2"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Mobile phone</label>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              required
              value={phoneDisplay}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 focus:ring-2"
              placeholder="(555) 555-1234"
              aria-invalid={phoneDigits.length > 0 && phoneDigits.length < 10}
            />
            <p className="mt-1 text-xs text-zinc-500">
              U.S. number — 10 digits only ({phoneDigits.length}/10)
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 focus:ring-2"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 focus:ring-2"
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Confirm password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 text-stone-50 outline-none ring-lime-700/50 focus:ring-2"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || phoneDigits.length !== 10}
            className="w-full rounded-xl bg-lime-800 px-4 py-3 text-sm font-semibold text-stone-50 hover:bg-lime-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-sm text-zinc-300">
          Already registered?{" "}
          <Link href={`/login?next=${encodeURIComponent(safeNext)}`} className="text-lime-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

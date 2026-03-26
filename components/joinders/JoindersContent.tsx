"use client";

import { useState } from "react";

export default function JoindersContent() {
  const [includeMailFiling, setIncludeMailFiling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const startCheckout = async () => {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch("/api/checkout/joinder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ includeMailFiling }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to start checkout");
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Joinders</h1>
      <section className="mb-10 space-y-4">
        <p className="text-gray-700">
          A <strong>joinder</strong> makes the retirement plan a party to your
          case so the court’s order is enforceable. We only prepare joinders
          when required by the plan.
        </p>
        <div className="rounded-2xl border bg-gray-50 p-4">
          <h2 className="mb-2 font-semibold">
            Which plans typically require a joinder?
          </h2>
          <ul className="list-inside list-disc space-y-1 text-gray-800">
            <li>CalPERS</li>
            <li>CalSTRS</li>
            <li>LACERA / other 1937 Act systems</li>
            <li>
              Most DC plans (401(k), 403(b), 457, IAP) do not require joinder
            </li>
          </ul>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border p-5">
            <h3 className="mb-1 font-semibold">Our policy</h3>
            <p className="text-gray-700">
              We prepare joinders <strong>only</strong> when required by the plan
              administrator for a DRO/QDRO.
            </p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="mb-1 font-semibold">Pricing</h3>
            <p className="text-gray-700">
              <strong>$350 per joinder set</strong>. Optional mail filing adds
              court & mailing costs.
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-2xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">Order a joinder</h2>
        <label className="mb-4 flex items-center gap-3">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={includeMailFiling}
            onChange={(e) => setIncludeMailFiling(e.target.checked)}
          />
          <span>Include optional mail filing (fees added)</span>
        </label>
        {err && <p className="mb-3 text-red-600">{err}</p>}
        <button
          type="button"
          onClick={startCheckout}
          disabled={loading}
          className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Starting checkout…" : "Purchase Joinder ($350)"}
        </button>
        <p className="mt-3 text-sm text-gray-600">
          You’ll be redirected to Stripe to pay.
        </p>
      </section>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useIntake } from "../_state/useIntake";

function AttyForm({ side }: { side: "petitioner" | "respondent" }) {
  const { attorneys, set } = useIntake();
  const a = (attorneys as any)[side] || { name: "" };
  const update = (k: string, v: any) =>
    set({ attorneys: { ...attorneys, [side]: { ...a, [k]: v } } });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-1 text-lg font-semibold text-stone-50">
        Attorney for {side === "petitioner" ? "Petitioner" : "Respondent"}
      </h3>
      <p className="mb-4 text-xs text-zinc-400">
        Counsel of record for filings and service.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Attorney Name"
          value={a.name || ""}
          onChange={(e) => update("name", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="CA State Bar Number"
          value={a.bar || ""}
          onChange={(e) => update("bar", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Email"
          value={a.email || ""}
          onChange={(e) => update("email", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Phone"
          value={a.phone || ""}
          onChange={(e) => update("phone", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Address Line 1"
          value={a.address1 || ""}
          onChange={(e) => update("address1", e.target.value)}
        />
        <input
          className="rounded-lg border border-white/15 bg-zinc-900 p-3 text-stone-50"
          placeholder="Address Line 2"
          value={a.address2 || ""}
          onChange={(e) => update("address2", e.target.value)}
        />
      </div>
    </div>
  );
}

export default function AttorneysStep() {
  const r = useRouter();
  const { petitioner, respondent } = useIntake();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-stone-50">
        Step 3: Attorney information
      </h1>
      <p className="mb-6 text-zinc-300">
        Only represented parties need counsel listed. Self-represented parties
        were skipped automatically.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {!petitioner.selfRepresented && <AttyForm side="petitioner" />}
        {!respondent.selfRepresented && <AttyForm side="respondent" />}
      </div>
      {petitioner.selfRepresented && respondent.selfRepresented && (
        <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
          Both parties are self-represented. Continue to plan and order
          questions.
        </p>
      )}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => r.push("/intake/parties")}
          className="rounded-xl border border-white/15 px-5 py-3 text-zinc-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => r.push("/intake/plan-questions")}
          className="rounded-xl bg-lime-800 px-6 py-3 font-semibold text-white"
        >
          Continue to plan questions
        </button>
      </div>
    </main>
  );
}

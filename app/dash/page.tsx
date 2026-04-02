"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DroPlanPicker from "@/components/intake/DroPlanPicker";
import { planLabelForKey } from "@/lib/planDisplay";

type MatterListItem = {
  id: string;
  caseNumber: string;
  county: string;
  createdAt: string;
  petitionerName: string;
  respondentName: string;
  planKeys: string[];
  plans?: {
    id: string;
    planKey: string;
    memberPartyRole: "PETITIONER" | "RESPONDENT";
    joinderRequired: boolean;
  }[];
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [matters, setMatters] = useState<MatterListItem[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setNotice(null);
        const res = await fetch("/api/matters");
        const text = await res.text().catch(() => "");
        let json: any = null;
        try {
          json = text ? JSON.parse(text) : null;
        } catch {
          json = null;
        }
        if (!res.ok) {
          throw new Error(
            json?.error ||
              `Failed to load matters (HTTP ${res.status})`,
          );
        }
        if (!cancelled && json?.message) setNotice(String(json.message));
        if (!cancelled) setMatters(json?.matters || []);
        if (!cancelled) setIsSuperAdmin(Boolean(json?.isSuperAdmin));
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load dashboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const emptyState = useMemo(() => !loading && !error && matters.length === 0, [
    loading,
    error,
    matters.length,
  ]);

  const mattersByPlan = useMemo(() => {
    const map = new Map<string, MatterListItem[]>();
    for (const m of matters) {
      const keys = (m.planKeys || []).filter(Boolean);
      const bucket = keys.length ? keys : ["unknown"];
      for (const k of bucket) {
        if (!map.has(k)) map.set(k, []);
        map.get(k)!.push(m);
      }
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [matters]);

  const courtCode = (county: string) => {
    const c = String(county || "").toLowerCase();
    if (c.includes("los angeles")) return "LASC";
    if (c.includes("orange")) return "OCSC";
    if (c.includes("san bernardino")) return "SBSC";
    if (c.includes("ventura")) return "VCSC";
    if (c.includes("san diego")) return "SDSC";
    return "CSC";
  };

  const memberLabel = (role: "PETITIONER" | "RESPONDENT") =>
    role === "PETITIONER" ? "Husband (Petitioner)" : "Wife (Respondent)";

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-10 lg:py-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(1200px_circle_at_0%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(900px_circle_at_100%_0%,rgba(132,204,22,0.14),transparent_55%)] p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-300/90">
              CLIENT PORTAL
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-50">
              Overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">
              Matters where you are listed as petitioner or respondent (same email as
              login) appear here. Open a case to download drafts by plan, upload your
              judgment and plan statements, and grab letters.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/intake/plans"
              className="rounded-xl bg-neutral-200 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-white"
            >
              New intake
            </Link>
            <Link
              href="/intake/review"
              className="rounded-xl bg-lime-800 px-5 py-3 text-sm font-semibold text-stone-50 hover:bg-lime-700"
            >
              Generate drafts
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold tracking-wide text-zinc-400">
            MATTERS
          </div>
          <div className="mt-2 text-2xl font-semibold text-stone-50">
            {loading ? "—" : matters.length}
          </div>
          <div className="mt-1 text-sm text-zinc-300">
            {isSuperAdmin ? "Staff: up to 500" : "Your linked cases"}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold tracking-wide text-zinc-400">
            STATUS
          </div>
          <div className="mt-2 text-2xl font-semibold text-stone-50">
            {loading ? "Loading" : error ? "Error" : "Online"}
          </div>
          <div className="mt-1 text-sm text-zinc-300">
            {error ? "Fix server error and refresh" : "API connected"}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold tracking-wide text-zinc-400">
            DOCUMENTS
          </div>
          <div className="mt-2 text-2xl font-semibold text-stone-50">Saved</div>
          <div className="mt-1 text-sm text-zinc-300">
            Open a matter to view downloads
          </div>
        </div>
      </section>

      <section className="mt-8">
        <DroPlanPicker
          title="Start a new DRO request"
          description="Choose plans first, then case information, parties, attorneys (if any), and plan-specific questions."
          continueLabel="Continue intake"
          continueTo="/intake/case"
        />
      </section>

      {error && (
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      )}
      {notice && !error && (
        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          {notice}
        </div>
      )}

      {loading && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          Loading…
        </div>
      )}

      {emptyState && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
          <p>No matters linked to this login yet.</p>
          <p className="mt-2 text-zinc-400">
            Start an intake with party emails that match this account, or ask staff to
            align your login email with your case contact email.
          </p>
        </div>
      )}

      {!loading && !error && matters.length > 0 && (
        <section className="mt-10 space-y-4">
          {mattersByPlan.map(([planKey, items]) => (
            <div
              key={planKey}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
                <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
                  {planKey === "unknown"
                    ? "PLAN (UNKNOWN)"
                    : planLabelForKey(planKey)}
                </h2>
                <div className="text-xs text-zinc-400">{items.length} matter(s)</div>
              </div>
              <ul className="divide-y divide-white/10">
                {items.map((m) => (
                  <li key={`${planKey}-${m.id}`} className="px-6 py-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-zinc-400">
                          {courtCode(m.county)} • Case {m.caseNumber}
                        </div>
                        <div className="mt-1 truncate text-base font-semibold text-stone-50">
                          {m.petitionerName} v. {m.respondentName}
                        </div>
                        {planKey !== "unknown" && (
                          <div className="mt-2 text-sm text-zinc-300">
                            <span className="text-zinc-400">Member/Participant:</span>{" "}
                            {(() => {
                              const row = (m.plans || []).find(
                                (p) => p.planKey === planKey,
                              );
                              return row
                                ? memberLabel(row.memberPartyRole)
                                : "—";
                            })()}
                          </div>
                        )}
                        <div className="mt-2 text-xs text-zinc-400">
                          Created: {new Date(m.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        <Link
                          href={`/dash/matter/${m.id}`}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                        >
                          Open
                        </Link>
                        <Link
                          href={`/dash/matter/${m.id}/edit`}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                        >
                          Edit info
                        </Link>
                        {isSuperAdmin && (
                          <button
                            type="button"
                            onClick={async () => {
                              if (
                                !confirm(
                                  `Staff delete: matter ${m.caseNumber}? This cannot be undone.`,
                                )
                              )
                                return;
                              try {
                                const res = await fetch(`/api/matters/${m.id}`, {
                                  method: "DELETE",
                                });
                                if (!res.ok) {
                                  const j = await res.json().catch(() => ({}));
                                  throw new Error(j.error || "Delete failed");
                                }
                                setMatters((prev) => prev.filter((x) => x.id !== m.id));
                              } catch (e: any) {
                                alert(e.message);
                              }
                            }}
                            className="rounded-lg border border-rose-500/40 px-3 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-950/50"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

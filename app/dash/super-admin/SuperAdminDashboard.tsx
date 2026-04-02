"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { WORKFLOW_STATUSES } from "@/data/workflowStatuses";

type OverviewMatter = {
  id: string;
  caseNumber: string;
  county: string;
  workflowStatus: string;
  amountDueCents: number;
  splitBill: boolean;
  petitionerShareCents: number | null;
  respondentShareCents: number | null;
  petitionerPaidAt: string | null;
  respondentPaidAt: string | null;
  planAdminEmail: string | null;
  notesInternal: string | null;
  quotedOrderPrepCents: number;
  quotedMailingCents: number;
  quotedFilingCents: number;
  petitioner: { firstName: string; lastName: string; email: string };
  respondent: { firstName: string; lastName: string; email: string };
  plans: { id: string; planKey: string; label: string; joinderRequired: boolean }[];
};

type Overview = {
  metrics: {
    openCases: number;
    newIntakesThisMonth: number;
    beyondEmail: number;
    filing: number;
    awaitingFinalApproval: number;
    closed: number;
    newIntakeStatusCount: number;
  };
  revenueMonth: { order_prep: number; mailing: number; filing: number; total: number };
  revenueYear: { order_prep: number; mailing: number; filing: number; total: number };
  matters: OverviewMatter[];
};

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function SuperAdminDashboard() {
  const [data, setData] = useState<Overview | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/overview");
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Failed to load overview");
      setData(j);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && !data) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 text-zinc-300">
        Loading staff overview…
      </main>
    );
  }

  if (err || !data) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-rose-300">{err || "No data"}</p>
        <button
          type="button"
          onClick={load}
          className="mt-4 rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-200"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-300/90">
            Staff only
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-white">Super admin</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            All matters, billing flags, joinders, payment reminders, and draft
            communications. Parties never see this page.
          </p>
        </div>
        <Link
          href="/dash"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/10"
        >
          Client portal
        </Link>
      </header>

      <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Open pipeline" value={String(data.metrics.openCases)} />
        <MetricCard
          label="New intakes (month)"
          value={String(data.metrics.newIntakesThisMonth)}
        />
        <MetricCard label="Beyond email" value={String(data.metrics.beyondEmail)} />
        <MetricCard label="Filing" value={String(data.metrics.filing)} />
        <MetricCard
          label="Awaiting final approval"
          value={String(data.metrics.awaitingFinalApproval)}
        />
        <MetricCard label="Closed" value={String(data.metrics.closed)} />
        <MetricCard
          label="Status: NEW_INTAKE"
          value={String(data.metrics.newIntakeStatusCount)}
        />
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-2">
        <RevenueCard title="Fees collected (this month)" r={data.revenueMonth} />
        <RevenueCard title="Fees collected (YTD)" r={data.revenueYear} />
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-semibold text-zinc-200">All matters</h2>
        </div>
        <ul className="divide-y divide-white/10">
          {data.matters.map((m) => (
            <li key={m.id} className="px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs text-zinc-500">
                    {m.caseNumber} • {m.county}
                  </div>
                  <div className="font-medium text-stone-100">
                    {m.petitioner.lastName} / {m.respondent.lastName}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">
                    Plans:{" "}
                    {m.plans.map((p) => `${p.label}${p.joinderRequired ? " (joinder)" : ""}`).join(" · ") ||
                      "—"}
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Due: {money(m.amountDueCents)}
                    {m.splitBill && (
                      <span>
                        {" "}
                        • Split P {money(m.petitionerShareCents ?? 0)}{" "}
                        {m.petitionerPaidAt ? "✓" : "due"} / R{" "}
                        {money(m.respondentShareCents ?? 0)}{" "}
                        {m.respondentPaidAt ? "✓" : "due"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg border border-lime-500/30 bg-lime-950/30 px-2 py-1 text-xs font-medium text-lime-200">
                    {m.workflowStatus}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                    className="rounded-lg border border-white/15 px-3 py-1 text-xs font-medium text-zinc-200 hover:bg-white/5"
                  >
                    {expanded === m.id ? "Close" : "Manage"}
                  </button>
                </div>
              </div>
              {expanded === m.id && (
                <MatterStaffPanel matter={m} onSaved={load} onCollapse={() => setExpanded(null)} />
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function RevenueCard({
  title,
  r,
}: {
  title: string;
  r: { order_prep: number; mailing: number; filing: number; total: number };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-violet-950/20 p-5">
      <h3 className="text-sm font-semibold text-violet-200">{title}</h3>
      <dl className="mt-3 space-y-1 text-sm text-zinc-300">
        <div className="flex justify-between">
          <dt>Order preparation</dt>
          <dd>{money(r.order_prep)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Mailing</dt>
          <dd>{money(r.mailing)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Filing</dt>
          <dd>{money(r.filing)}</dd>
        </div>
        <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-semibold text-white">
          <dt>Total</dt>
          <dd>{money(r.total)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-zinc-500">
        Ledger entries only—record payments below per matter. Stripe is not auto-synced yet.
      </p>
    </div>
  );
}

function MatterStaffPanel({
  matter,
  onSaved,
  onCollapse,
}: {
  matter: OverviewMatter;
  onSaved: () => void;
  onCollapse: () => void;
}) {
  const [workflowStatus, setWorkflowStatus] = useState(matter.workflowStatus);
  const [amountDueCents, setAmountDueCents] = useState(String(matter.amountDueCents));
  const [splitBill, setSplitBill] = useState(matter.splitBill);
  const [petShare, setPetShare] = useState(
    matter.petitionerShareCents != null ? String(matter.petitionerShareCents) : "",
  );
  const [resShare, setResShare] = useState(
    matter.respondentShareCents != null ? String(matter.respondentShareCents) : "",
  );
  const [planAdminEmail, setPlanAdminEmail] = useState(matter.planAdminEmail || "");
  const [notesInternal, setNotesInternal] = useState(matter.notesInternal || "");
  const [joinder, setJoinder] = useState(
    Object.fromEntries(matter.plans.map((p) => [p.id, p.joinderRequired])),
  );
  const [feeCat, setFeeCat] = useState<"order_prep" | "mailing" | "filing">("order_prep");
  const [feeAmt, setFeeAmt] = useState("");
  const [subj, setSubj] = useState("Draft domestic relations order package");
  const [msg, setMsg] = useState(
    "Please find the linked drafts and next steps for your matter.",
  );
  const [busy, setBusy] = useState<string | null>(null);
  const [statusLine, setStatusLine] = useState<string | null>(null);

  const saveMatter = async () => {
    setBusy("save");
    setStatusLine(null);
    try {
      const planJoinderUpdates = matter.plans.map((p) => ({
        id: p.id,
        joinderRequired: Boolean(joinder[p.id]),
      }));
      const res = await fetch(`/api/matters/${matter.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflowStatus,
          amountDueCents: Number(amountDueCents) || 0,
          splitBill,
          petitionerShareCents: petShare === "" ? null : Number(petShare),
          respondentShareCents: resShare === "" ? null : Number(resShare),
          planAdminEmail: planAdminEmail.trim() || null,
          notesInternal: notesInternal.trim() || null,
          planJoinderUpdates,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Save failed");
      setStatusLine("Saved.");
      onSaved();
    } catch (e: unknown) {
      setStatusLine(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(null);
    }
  };

  const recordFee = async () => {
    const cents = Math.round(parseFloat(feeAmt) * 100);
    if (!Number.isFinite(cents) || cents <= 0) {
      setStatusLine("Enter a valid dollar amount for the fee.");
      return;
    }
    setBusy("fee");
    setStatusLine(null);
    try {
      const res = await fetch(`/api/admin/matters/${matter.id}/fee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: feeCat, amountCents: cents }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Fee record failed");
      setFeeAmt("");
      setStatusLine("Fee recorded.");
      onSaved();
    } catch (e: unknown) {
      setStatusLine(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(null);
    }
  };

  const remind = async (target: "petitioner" | "respondent" | "both") => {
    setBusy(`remind-${target}`);
    setStatusLine(null);
    try {
      const res = await fetch(`/api/admin/matters/${matter.id}/remind-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Reminder failed");
      setStatusLine(
        j.sent
          ? "Reminder sent."
          : `Not sent: ${j.reason || "check SMTP"}`,
      );
    } catch (e: unknown) {
      setStatusLine(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(null);
    }
  };

  const sendComms = async (opts: {
    toPlanAdmin: boolean;
    ccParties: boolean;
    ccAttorneys: boolean;
    includeDraftLinks: boolean;
  }) => {
    setBusy("comms");
    setStatusLine(null);
    try {
      const res = await fetch(`/api/admin/matters/${matter.id}/communications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subj,
          message: msg,
          includeDraftLinks: opts.includeDraftLinks,
          toPlanAdmin: opts.toPlanAdmin,
          ccParties: opts.ccParties,
          ccAttorneys: opts.ccAttorneys,
          planAdminEmail: planAdminEmail.trim() || undefined,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Send failed");
      setStatusLine(
        j.sent ? "Message sent." : `Not sent: ${j.reason || "check SMTP"}`,
      );
    } catch (e: unknown) {
      setStatusLine(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mt-4 space-y-6 rounded-xl border border-white/10 bg-zinc-950/60 p-4">
      {statusLine && <p className="text-sm text-lime-200/90">{statusLine}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-xs text-zinc-500">
          Workflow status
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={workflowStatus}
            onChange={(e) => setWorkflowStatus(e.target.value)}
          >
            {WORKFLOW_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs text-zinc-500">
          Amount due (cents)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={amountDueCents}
            onChange={(e) => setAmountDueCents(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={splitBill}
            onChange={(e) => setSplitBill(e.target.checked)}
            className="accent-lime-600"
          />
          Split bill between parties
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-zinc-500">
            Petitioner share (¢)
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-sm text-white"
              value={petShare}
              onChange={(e) => setPetShare(e.target.value)}
            />
          </label>
          <label className="block text-xs text-zinc-500">
            Respondent share (¢)
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-2 py-2 text-sm text-white"
              value={resShare}
              onChange={(e) => setResShare(e.target.value)}
            />
          </label>
        </div>
        <label className="block text-xs text-zinc-500 md:col-span-2">
          Plan admin email (for review letters / comms)
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={planAdminEmail}
            onChange={(e) => setPlanAdminEmail(e.target.value)}
          />
        </label>
        <label className="block text-xs text-zinc-500 md:col-span-2">
          Internal notes
          <textarea
            className="mt-1 min-h-[72px] w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={notesInternal}
            onChange={(e) => setNotesInternal(e.target.value)}
          />
        </label>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-zinc-500">Joinder per plan</p>
        <ul className="space-y-2">
          {matter.plans.map((p) => (
            <li key={p.id} className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                className="accent-lime-600"
                checked={Boolean(joinder[p.id])}
                onChange={(e) =>
                  setJoinder((prev) => ({ ...prev, [p.id]: e.target.checked }))
                }
              />
              {p.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy !== null}
          onClick={saveMatter}
          className="rounded-lg bg-lime-700 px-4 py-2 text-sm font-semibold text-white hover:bg-lime-600 disabled:opacity-40"
        >
          Save matter
        </button>
        <button
          type="button"
          onClick={onCollapse}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-zinc-300"
        >
          Collapse
        </button>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="mb-2 text-xs font-semibold text-zinc-500">Payment reminders</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => remind("petitioner")}
            className="rounded-lg border border-amber-500/40 px-3 py-2 text-xs font-medium text-amber-100 hover:bg-amber-950/40"
          >
            Email petitioner
          </button>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => remind("respondent")}
            className="rounded-lg border border-amber-500/40 px-3 py-2 text-xs font-medium text-amber-100 hover:bg-amber-950/40"
          >
            Email respondent
          </button>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => remind("both")}
            className="rounded-lg border border-amber-500/40 px-3 py-2 text-xs font-medium text-amber-100 hover:bg-amber-950/40"
          >
            Email both
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="mb-2 text-xs font-semibold text-zinc-500">Record fee received (ledger)</p>
        <div className="flex flex-wrap items-end gap-2">
          <select
            className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={feeCat}
            onChange={(e) => setFeeCat(e.target.value as typeof feeCat)}
          >
            <option value="order_prep">Order preparation</option>
            <option value="mailing">Mailing</option>
            <option value="filing">Filing</option>
          </select>
          <input
            placeholder="Dollars e.g. 450"
            className="w-36 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={feeAmt}
            onChange={(e) => setFeeAmt(e.target.value)}
          />
          <button
            type="button"
            disabled={busy !== null}
            onClick={recordFee}
            className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600"
          >
            Record
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="mb-2 text-xs font-semibold text-zinc-500">
          Resend drafts / custom letter (SMTP)
        </p>
        <label className="mb-2 block text-xs text-zinc-500">
          Subject
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={subj}
            onChange={(e) => setSubj(e.target.value)}
          />
        </label>
        <label className="mb-3 block text-xs text-zinc-500">
          Message
          <textarea
            className="mt-1 min-h-[100px] w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy !== null}
            onClick={() =>
              sendComms({
                toPlanAdmin: true,
                ccParties: true,
                ccAttorneys: true,
                includeDraftLinks: true,
              })
            }
            className="rounded-lg border border-lime-500/40 bg-lime-950/30 px-3 py-2 text-xs font-medium text-lime-100"
          >
            To plan admin, CC parties + attorneys + links
          </button>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() =>
              sendComms({
                toPlanAdmin: false,
                ccParties: true,
                ccAttorneys: true,
                includeDraftLinks: true,
              })
            }
            className="rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-zinc-200"
          >
            Parties + attorneys only + links
          </button>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() =>
              sendComms({
                toPlanAdmin: true,
                ccParties: false,
                ccAttorneys: false,
                includeDraftLinks: false,
              })
            }
            className="rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-zinc-200"
          >
            Plan admin only (no CC)
          </button>
        </div>
      </div>
    </div>
  );
}

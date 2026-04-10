"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Entry = {
  id: string;
  questionSample: string;
  answerText: string;
  tagsCsv: string | null;
  isActive: boolean;
  createdAt: string;
};

type LogRow = {
  id: string;
  userEmail: string | null;
  question: string;
  answer: string;
  blockedByPolicy: boolean;
  usedModel: boolean;
  modelName: string | null;
  createdAt: string;
};

export default function ChatAdminConsole() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/chat/admin");
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Failed to load chat admin data.");
      setEntries(j.entries || []);
      setLogs(j.logs || []);
    } catch (e: any) {
      setErr(e.message || "Load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const saveEntry = async (e: Entry) => {
    setSavingId(e.id);
    try {
      const res = await fetch(`/api/chat/admin/entries/${e.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionSample: e.questionSample,
          answerText: e.answerText,
          tagsCsv: e.tagsCsv || "",
          isActive: e.isActive,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Save failed");
      await load();
    } catch (x: any) {
      alert(x.message || "Save failed");
    } finally {
      setSavingId(null);
    }
  };

  if (loading && !entries.length && !logs.length) {
    return <main className="mx-auto max-w-7xl px-4 py-10 text-zinc-300">Loading…</main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Chat Admin Console</h1>
          <p className="text-sm text-zinc-400">
            Primary super-admin only: curate training entries, review chat logs, and tune guardrails.
          </p>
        </div>
        <Link href="/dash/super-admin" className="text-sm text-lime-400 underline">
          Back to super admin
        </Link>
      </header>

      {err && <p className="mb-4 rounded border border-rose-500/40 p-3 text-rose-200">{err}</p>}

      <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 text-sm font-semibold text-zinc-200">Knowledge Entries</h2>
        <div className="space-y-4">
          {entries.map((e, idx) => (
            <div key={e.id} className="rounded-xl border border-white/10 bg-zinc-950/40 p-3">
              <p className="mb-2 text-xs text-zinc-500">
                #{idx + 1} · {new Date(e.createdAt).toLocaleString()}
              </p>
              <label className="mb-2 block text-xs text-zinc-400">
                Question sample
                <textarea
                  className="mt-1 min-h-[56px] w-full rounded border border-white/10 bg-zinc-900 p-2 text-sm text-zinc-100"
                  value={e.questionSample}
                  onChange={(ev) =>
                    setEntries((prev) =>
                      prev.map((x) =>
                        x.id === e.id ? { ...x, questionSample: ev.target.value } : x,
                      ),
                    )
                  }
                />
              </label>
              <label className="mb-2 block text-xs text-zinc-400">
                Approved answer
                <textarea
                  className="mt-1 min-h-[92px] w-full rounded border border-white/10 bg-zinc-900 p-2 text-sm text-zinc-100"
                  value={e.answerText}
                  onChange={(ev) =>
                    setEntries((prev) =>
                      prev.map((x) =>
                        x.id === e.id ? { ...x, answerText: ev.target.value } : x,
                      ),
                    )
                  }
                />
              </label>
              <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                <input
                  className="rounded border border-white/10 bg-zinc-900 p-2 text-xs text-zinc-200"
                  placeholder="tags csv"
                  value={e.tagsCsv || ""}
                  onChange={(ev) =>
                    setEntries((prev) =>
                      prev.map((x) => (x.id === e.id ? { ...x, tagsCsv: ev.target.value } : x)),
                    )
                  }
                />
                <label className="inline-flex items-center gap-2 text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={e.isActive}
                    onChange={(ev) =>
                      setEntries((prev) =>
                        prev.map((x) =>
                          x.id === e.id ? { ...x, isActive: ev.target.checked } : x,
                        ),
                      )
                    }
                  />
                  Active
                </label>
                <button
                  type="button"
                  onClick={() => void saveEntry(e)}
                  disabled={savingId === e.id}
                  className="rounded bg-lime-800 px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"
                >
                  {savingId === e.id ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 text-sm font-semibold text-zinc-200">Chat Logs</h2>
        <div className="space-y-2">
          {logs.map((l) => (
            <div key={l.id} className="rounded border border-white/10 bg-zinc-950/30 p-3">
              <div className="mb-1 text-xs text-zinc-500">
                {new Date(l.createdAt).toLocaleString()} · {l.userEmail || "anonymous"} ·{" "}
                {l.blockedByPolicy ? "BLOCKED" : l.usedModel ? `LLM (${l.modelName || "model"})` : "Fallback"}
              </div>
              <p className="text-xs text-zinc-400">Q: {l.question}</p>
              <p className="mt-1 text-xs text-zinc-300">A: {l.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


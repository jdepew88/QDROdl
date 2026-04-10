"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ChatMsg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Ask me about QDRO plans, likely employer plan types, joinders, timeline, and process. I can also summarize FAQ answers.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [teachBusy, setTeachBusy] = useState(false);
  const [teachMsg, setTeachMsg] = useState<string | null>(null);
  const [tagsCsv, setTagsCsv] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me").catch(() => null);
      const j = await res?.json().catch(() => ({}));
      setIsSuperAdmin(Boolean(j?.isSuperAdmin));
    })();
  }, []);

  const ask = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setError(null);
    setTeachMsg(null);
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setQuestion("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history: next.slice(-8) }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j?.error || "Chat failed");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: String(j?.answer || "").trim() || "No response." },
      ]);
    } catch (e: any) {
      setError(e.message || "Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  const latestUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const latestAssistant =
    [...messages].reverse().find((m) => m.role === "assistant")?.content || "";

  const teach = async () => {
    if (!isSuperAdmin || !latestUser || !latestAssistant || teachBusy) return;
    setTeachBusy(true);
    setTeachMsg(null);
    try {
      const res = await fetch("/api/chat/teach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionSample: latestUser,
          answerText: latestAssistant,
          tagsCsv,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j?.error || "Could not save training entry");
      setTeachMsg("Saved as approved training entry.");
      setTagsCsv("");
    } catch (e: any) {
      setTeachMsg(e.message || "Training save failed");
    } finally {
      setTeachBusy(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold text-stone-50">QDROdl Chat</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Walled-garden QDRO assistant for plan, process, timeline, and FAQ guidance.
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Educational information only; not legal advice.
          <span className="ml-2">
            <Link href="/all_plans" className="text-lime-400 underline">
              Browse plans
            </Link>
          </span>
        </p>
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "rounded-xl border border-lime-500/30 bg-lime-950/20 p-3 text-sm text-lime-100"
                  : "rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-100"
              }
            >
              <div className="mb-1 text-xs uppercase tracking-wide text-zinc-400">
                {m.role === "user" ? "You" : "QDROdl AI"}
              </div>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 rounded-lg border border-white/15 bg-zinc-900 p-3 text-sm text-stone-50"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void ask();
              }
            }}
            placeholder="Ask about plan types, employers, joinders, process timeline..."
          />
          <button
            type="button"
            onClick={() => void ask()}
            disabled={loading || !question.trim()}
            className="rounded-lg bg-lime-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
      </section>

      {isSuperAdmin && (
        <section className="mt-6 rounded-2xl border border-violet-500/30 bg-violet-950/20 p-4">
          <h2 className="text-sm font-semibold text-violet-100">Super-admin training</h2>
          <p className="mt-1 text-xs text-violet-200/80">
            Save the latest Q&A so the chat improves over time.
          </p>
          <input
            className="mt-3 w-full rounded-lg border border-white/15 bg-zinc-900 p-2 text-xs text-stone-50"
            placeholder="Optional tags (comma-separated): calpers, timeline, joinder"
            value={tagsCsv}
            onChange={(e) => setTagsCsv(e.target.value)}
          />
          <button
            type="button"
            onClick={() => void teach()}
            disabled={teachBusy || !latestUser || !latestAssistant}
            className="mt-3 rounded-lg border border-violet-400/40 px-3 py-2 text-xs font-semibold text-violet-100 disabled:opacity-40"
          >
            {teachBusy ? "Saving..." : "Save latest answer as training"}
          </button>
          {teachMsg && <p className="mt-2 text-xs text-violet-200">{teachMsg}</p>}
        </section>
      )}
    </main>
  );
}


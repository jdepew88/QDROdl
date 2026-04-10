import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildKnowledgeText } from "@/lib/chatKnowledgeBase";
import { getSessionEmailFromRequest } from "@/lib/dashboardAccess";
import { isQuestionInScope, policyBlockMessage } from "@/lib/chatGuardrails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

function keywordScore(text: string, query: string): number {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((w) => w.length >= 3);
  if (!words.length) return 0;
  const t = text.toLowerCase();
  let score = 0;
  for (const w of words) {
    if (t.includes(w)) score += 1;
  }
  return score;
}

async function buildCuratedContext(question: string): Promise<string> {
  const rows = await prisma.chatKnowledgeEntry.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  const ranked = rows
    .map((r) => ({
      row: r,
      score: keywordScore(`${r.questionSample}\n${r.answerText}\n${r.tagsCsv || ""}`, question),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.row);

  const custom = ranked.length
    ? ranked
        .map(
          (r) =>
            `Q sample: ${r.questionSample}\nA approved: ${r.answerText}\nTags: ${r.tagsCsv || ""}`,
        )
        .join("\n\n")
    : "No super-admin custom entries yet.";

  return `${buildKnowledgeText()}\n\n## Super-admin custom knowledge\n${custom}`;
}

function fallbackAnswer(question: string, contextText: string): string {
  const lines = contextText.split("\n").filter(Boolean);
  const ranked = lines
    .map((line) => ({ line, score: keywordScore(line, question) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => x.line);
  if (!ranked.length || ranked.every((x) => !x.trim())) {
    return "I can help with QDRO process, timeline, FAQ, and plan/employer guidance. Please ask a more specific question (for example: employer + plan type + county).";
  }
  return `Here is what I can share from QDROdl guidance:\n\n- ${ranked.join("\n- ")}\n\nIf you want, I can narrow this to your exact employer and plan combination.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const question = String(body?.question || "").trim();
    const history = Array.isArray(body?.history) ? (body.history as Msg[]) : [];
    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }
    const userEmail = getSessionEmailFromRequest(req);
    const scope = isQuestionInScope(question);
    if (!scope.inScope) {
      const answer = policyBlockMessage();
      await prisma.chatConversationLog.create({
        data: {
          userEmail,
          question,
          answer,
          blockedByPolicy: true,
          usedModel: false,
          sourceContext: scope.reason,
        },
      });
      return NextResponse.json({
        answer,
        usedModel: false,
        blocked: true,
      });
    }

    const contextText = await buildCuratedContext(question);
    const apiKey = process.env.OPENAI_API_KEY || "";
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      const answer = fallbackAnswer(question, contextText);
      await prisma.chatConversationLog.create({
        data: {
          userEmail,
          question,
          answer,
          blockedByPolicy: false,
          usedModel: false,
          sourceContext: "fallback:no_api_key",
        },
      });
      return NextResponse.json({
        answer,
        usedModel: false,
      });
    }

    const systemPrompt =
      "You are QDROdl's client support assistant in a walled garden. " +
      "Only answer QDRO, joinder, plan, process, timeline, and employer-plan guidance questions. " +
      "If asked unrelated/legal-advice-heavy questions, provide general educational guidance and recommend consulting counsel. " +
      "Do not invent plan rules. Prefer concise, practical explanations.";

    const trimmedHistory = history.slice(-8).map((m) => ({
      role: m.role,
      content: String(m.content || "").slice(0, 4000),
    }));

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "system",
            content: `Use this approved knowledge base:\n\n${contextText}`,
          },
          ...trimmedHistory,
          { role: "user", content: question },
        ],
      }),
    });

    const json = await resp.json().catch(() => ({}));
    const answer = String(json?.choices?.[0]?.message?.content || "").trim();
    if (!resp.ok || !answer) {
      const fallback = fallbackAnswer(question, contextText);
      await prisma.chatConversationLog.create({
        data: {
          userEmail,
          question,
          answer: fallback,
          blockedByPolicy: false,
          usedModel: false,
          modelName: model,
          sourceContext: "fallback:model_error",
        },
      });
      return NextResponse.json({
        answer: fallback,
        usedModel: false,
      });
    }
    await prisma.chatConversationLog.create({
      data: {
        userEmail,
        question,
        answer,
        blockedByPolicy: false,
        usedModel: true,
        modelName: model,
        sourceContext: "llm",
      },
    });

    return NextResponse.json({ answer, usedModel: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Chat failed." },
      { status: 500 },
    );
  }
}


import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/**
 * Maps Stripe Price IDs to ledger categories used in admin revenue summaries.
 */
export function ledgerCategoryForPriceId(priceId: string | null | undefined): string {
  if (!priceId) return "order_prep";
  if (priceId === process.env.STRIPE_PRICE_MAIL_FILING) return "mailing";
  if (priceId === process.env.STRIPE_PRICE_FILING) return "filing";
  // Joinder and any other catalog prices default to order preparation bucket.
  if (priceId === process.env.STRIPE_PRICE_JOINDER) return "order_prep";
  return "order_prep";
}

/**
 * After a successful Checkout Session, create FeeLedger rows (idempotent via sourceRef).
 */
export async function recordFeeLedgerFromCheckoutSession(
  sessionId: string,
): Promise<{ created: number; skipped: boolean }> {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const matterId = session.metadata?.matterId?.trim();
  if (!matterId) {
    return { created: 0, skipped: true };
  }

  const matter = await prisma.matter.findUnique({ where: { id: matterId } });
  if (!matter) {
    console.warn(`stripe ledger: matter ${matterId} not found for session ${sessionId}`);
    return { created: 0, skipped: true };
  }

  const paymentStatus = session.payment_status;
  if (paymentStatus !== "paid") {
    return { created: 0, skipped: true };
  }

  const { data: lines } = await stripe.checkout.sessions.listLineItems(sessionId, {
    limit: 100,
    expand: ["data.price"],
  });

  let created = 0;

  if (lines.length === 0) {
    const total = session.amount_total ?? 0;
    if (total <= 0) return { created: 0, skipped: true };
    const sourceRef = `${sessionId}:session_total`;
    const category = session.metadata?.feeCategory?.trim() || "order_prep";
    try {
      await prisma.feeLedgerEntry.create({
        data: {
          matterId,
          category,
          amountCents: total,
          sourceRef,
          note: `Stripe Checkout ${sessionId}`,
        },
      });
      created += 1;
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code;
      if (code === "P2002") return { created: 0, skipped: true };
      throw e;
    }
    return { created, skipped: false };
  }

  for (const line of lines) {
    const lineId = line.id || "line";
    const amount = line.amount_total ?? 0;
    if (amount <= 0) continue;
    const priceId =
      typeof line.price === "object" && line.price && "id" in line.price
        ? line.price.id
        : typeof line.price === "string"
          ? line.price
          : undefined;
    const category = ledgerCategoryForPriceId(priceId);
    const sourceRef = `${sessionId}:${lineId}`;
    try {
      await prisma.feeLedgerEntry.create({
        data: {
          matterId,
          category,
          amountCents: amount,
          sourceRef,
          note: `Stripe ${sessionId} (${line.description || priceId || "item"})`,
        },
      });
      created += 1;
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code;
      if (code === "P2002") continue;
      throw e;
    }
  }

  return { created, skipped: created === 0 };
}

export function verifyStripeWebhook(
  payload: Buffer,
  signature: string | null,
): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET");
  }
  if (!signature) {
    throw new Error("Missing stripe-signature header");
  }
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, signature, secret);
}

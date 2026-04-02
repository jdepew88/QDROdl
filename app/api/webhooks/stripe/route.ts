import { NextRequest, NextResponse } from "next/server";
import {
  recordFeeLedgerFromCheckoutSession,
  verifyStripeWebhook,
} from "@/lib/stripeLedger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook — configure in Dashboard with signing secret STRIPE_WEBHOOK_SECRET.
 * Listens for completed Checkout Sessions with metadata.matterId to write FeeLedgerEntry.
 */
export async function POST(req: NextRequest) {
  let event;
  try {
    const buf = Buffer.from(await req.arrayBuffer());
    const sig = req.headers.get("stripe-signature");
    event = verifyStripeWebhook(buf, sig);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Webhook verification failed";
    console.error("Stripe webhook verify:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { id: string };
        const result = await recordFeeLedgerFromCheckoutSession(session.id);
        if (result.skipped && result.created === 0) {
          // No matterId or not paid — still 200 so Stripe does not retry forever.
        }
        break;
      }
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as { id: string };
        await recordFeeLedgerFromCheckoutSession(session.id);
        break;
      }
      default:
        break;
    }
  } catch (e: unknown) {
    console.error("Stripe webhook handler:", e);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

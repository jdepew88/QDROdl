import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const includeMailFiling = Boolean(body?.includeMailFiling);
    const matterIdRaw =
      typeof body?.matterId === "string" ? body.matterId.trim() : "";
    if (matterIdRaw) {
      const exists = await prisma.matter.findUnique({
        where: { id: matterIdRaw },
        select: { id: true },
      });
      if (!exists) {
        return NextResponse.json(
          { error: "Invalid matterId — matter not found." },
          { status: 400 },
        );
      }
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      { price: process.env.STRIPE_PRICE_JOINDER!, quantity: 1 },
    ];
    if (includeMailFiling && process.env.STRIPE_PRICE_MAIL_FILING) {
      line_items.push({
        price: process.env.STRIPE_PRICE_MAIL_FILING,
        quantity: 1,
      });
    }
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items,
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
      metadata: {
        product: "joinder_preparation",
        includeMailFiling: includeMailFiling ? "true" : "false",
        ...(matterIdRaw ? { matterId: matterIdRaw } : {}),
      },
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message ?? "Stripe error" },
      { status: 500 },
    );
  }
}

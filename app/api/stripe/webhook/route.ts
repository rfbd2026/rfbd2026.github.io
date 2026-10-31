import Stripe from "stripe";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secretKey || !signingSecret || !signature) {
    return NextResponse.json({ received: false, error: "webhook_not_configured" }, { status: 503 });
  }
  const rawBody = Buffer.from(await request.arrayBuffer());
  let event: Stripe.Event;
  try {
    const stripe = new Stripe(secretKey);
    event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
  } catch {
    return NextResponse.json({ received: false, error: "invalid_signature" }, { status: 400 });
  }
  // No checkout can be initiated until final native files are verified. Do not
  // create entitlements or persist a payment from any redirect/webhook now.
  return NextResponse.json({ received: true, ignored: true, eventType: event.type }, { status: 200 });
}

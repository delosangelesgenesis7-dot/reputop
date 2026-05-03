import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder", { apiVersion: "2026-04-22.dahlia" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Firma faltante" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const restaurantId = session.metadata?.restaurant_id;
    const plan = session.metadata?.plan;
    if (restaurantId && plan) {
      await supabase
        .from("restaurants")
        .update({ plan, stripe_subscription_id: session.subscription as string })
        .eq("id", restaurantId);
    }
  }

  if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.paused") {
    const sub = event.data.object as Stripe.Subscription;
    const restaurantId = sub.metadata?.restaurant_id;
    if (restaurantId) {
      await supabase.from("restaurants").update({ plan: "cancelled" }).eq("id", restaurantId);
    }
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
    if (invoice.subscription) {
      const sub = await stripe.subscriptions.retrieve(invoice.subscription);
      const restaurantId = sub.metadata?.restaurant_id;
      if (restaurantId) {
        await supabase.from("restaurants").update({ plan: "cancelled" }).eq("id", restaurantId);
      }
    }
  }

  return NextResponse.json({ received: true });
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });

const PRICES = {
  basic: process.env.STRIPE_PRICE_BASIC!,
  pro: process.env.STRIPE_PRICE_PRO!,
};

export async function POST(req: NextRequest) {
  const { plan } = await req.json();

  if (!PRICES[plan as keyof typeof PRICES]) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }

  const cookieStore = cookies() as unknown as {
    getAll: () => { name: string; value: string }[];
    set: (name: string, value: string, options?: object) => void;
  };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { data: rest } = await supabase
    .from("restaurants")
    .select("id, name, email, stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!rest) return NextResponse.json({ error: "Restaurante no encontrado" }, { status: 404 });

  let customerId = rest.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: rest.email || user.email,
      name: rest.name,
      metadata: { restaurant_id: rest.id, user_id: user.id },
    });
    customerId = customer.id;
    await supabase.from("restaurants").update({ stripe_customer_id: customerId }).eq("id", rest.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: PRICES[plan as keyof typeof PRICES], quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?cancelled=1`,
    metadata: { restaurant_id: rest.id, plan },
    subscription_data: { metadata: { restaurant_id: rest.id, plan } },
  });

  return NextResponse.json({ url: session.url });
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder", { apiVersion: "2026-04-22.dahlia" });

export async function POST(req: NextRequest) {
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
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!rest?.stripe_customer_id) {
    return NextResponse.json({ error: "Sin suscripción activa" }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: rest.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}

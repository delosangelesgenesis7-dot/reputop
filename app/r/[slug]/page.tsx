import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import ReviewInterstitial from "./ReviewInterstitial";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
}

export default async function ReviewRedirectPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { ref } = await searchParams;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id, name, google_url, email")
    .eq("slug", slug)
    .single();

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Negocio no encontrado.</p>
      </div>
    );
  }

  if (ref) {
    await supabase
      .from("review_requests")
      .update({ clicked: true, clicked_at: new Date().toISOString() })
      .eq("id", ref);
  }

  // Notificar al dueño por email
  if (process.env.RESEND_API_KEY && restaurant.email) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const hora = new Date().toLocaleString("es-ES", {
        timeZone: "Europe/Madrid",
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
      await resend.emails.send({
        from: "Reputop <onboarding@resend.dev>",
        to: restaurant.email,
        subject: `⭐ ¡Un cliente está dejando una reseña en ${restaurant.name}!`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
            <div style="background:linear-gradient(135deg,#C9A84C,#A07830);border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
              <h1 style="color:white;margin:0;font-size:22px">⭐ Reputop</h1>
              <p style="color:#fed7aa;margin:6px 0 0;font-size:13px">Alerta de reseña</p>
            </div>
            <h2 style="color:#111;font-size:18px;margin-bottom:8px">¡Un cliente está dejando una reseña! 🎉</h2>
            <p style="color:#6b7280;font-size:14px">Un cliente acaba de hacer clic en tu link de reseñas para <strong>${restaurant.name}</strong>.</p>
            <div style="background:#f0fdf4;border-radius:12px;padding:16px;margin:20px 0;border:1px solid #bbf7d0;text-align:center">
              <p style="color:#16a34a;font-size:32px;margin:0">⭐</p>
              <p style="color:#16a34a;font-weight:bold;font-size:16px;margin:8px 0 0">Reseña en camino</p>
              <p style="color:#6b7280;font-size:13px;margin:4px 0 0">${hora}</p>
            </div>
            <p style="color:#6b7280;font-size:13px">En unos minutos revisa tu perfil de Google Maps para ver la nueva reseña.</p>
            <a href="https://reputop.vercel.app/dashboard"
               style="display:block;background:linear-gradient(135deg,#C9A84C,#A07830);color:white;text-align:center;padding:13px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:14px;margin-top:16px">
              Ver mi dashboard →
            </a>
          </div>
        `,
      });
    } catch {}
  }

  // Construir URL directa a reseñas
  let reviewUrl = restaurant.google_url;
  // Si es una URL de maps.app.goo.gl o maps.google.com, añadir parámetro de reseña
  if (reviewUrl.includes("maps.app.goo.gl") || reviewUrl.includes("g.page")) {
    reviewUrl = reviewUrl + (reviewUrl.includes("?") ? "&" : "?") + "hl=es";
  }

  return (
    <ReviewInterstitial
      restaurantName={restaurant.name}
      googleUrl={reviewUrl}
    />
  );
}

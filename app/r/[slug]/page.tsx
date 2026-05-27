import { createClient } from "@supabase/supabase-js";
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
    .select("id, name, google_url")
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

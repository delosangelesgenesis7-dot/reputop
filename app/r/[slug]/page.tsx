import { createClient } from "@/lib/supabase-server";
import ReviewInterstitial from "./ReviewInterstitial";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
}

export default async function ReviewRedirectPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { ref } = await searchParams;

  const supabase = createClient();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id, name, google_url")
    .eq("slug", slug)
    .single();

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Restaurante no encontrado.</p>
      </div>
    );
  }

  if (ref) {
    await supabase
      .from("review_requests")
      .update({ clicked: true, clicked_at: new Date().toISOString() })
      .eq("id", ref);
  }

  return (
    <ReviewInterstitial
      restaurantName={restaurant.name}
      googleUrl={restaurant.google_url}
    />
  );
}

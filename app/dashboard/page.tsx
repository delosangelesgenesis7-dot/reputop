"use client";

import { useEffect, useState } from "react";
import { Star, Send, Copy, BarChart2, MessageCircle, LogOut, CheckCircle, Users, QrCode, Download, Crown, CreditCard, Settings } from "lucide-react";
import OnboardingChecklist from "./OnboardingChecklist";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

interface Stats {
  total_sent: number;
  total_clicks: number;
}

interface Restaurant {
  id: string;
  name: string;
  google_url: string;
  slug: string;
  plan: string;
  trial_ends_at: string;
  stripe_customer_id?: string;
}

interface ReviewRequest {
  id: string;
  phone: string;
  clicked: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [stats, setStats] = useState<Stats>({ total_sent: 0, total_clicks: 0 });
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState("");
  const [history, setHistory] = useState<ReviewRequest[]>([]);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      let { data: rest } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!rest) {
        const meta = user.user_metadata;
        const { data: created } = await supabase
          .from("restaurants")
          .insert({
            user_id: user.id,
            name: meta?.restaurant_name || "Mi Restaurante",
            google_url: meta?.google_url || "https://maps.google.com",
            email: user.email,
          })
          .select()
          .single();
        rest = created;
      }

      if (rest) {
        setRestaurant(rest);
        const link = `${window.location.origin}/r/${rest.slug}`;
        const qr = await QRCode.toDataURL(link, { width: 300, margin: 2 });
        setQrUrl(qr);

        const { data: statsData } = await supabase
          .from("review_requests")
          .select("id, phone, clicked, created_at")
          .eq("restaurant_id", rest.id)
          .order("created_at", { ascending: false });

        if (statsData) {
          setStats({
            total_sent: statsData.length,
            total_clicks: statsData.filter((r) => r.clicked).length,
          });
          setHistory(statsData);
        }
      }

      setLoading(false);
    }

    loadData();
  }, [router]);

  const reviewLink = restaurant
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/r/${restaurant.slug}`
    : "";

  async function sendWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    if (!restaurant || !phone) return;
    setSending(true);

    const supabase = createClient();
    const { data } = await supabase
      .from("review_requests")
      .insert({ restaurant_id: restaurant.id, phone })
      .select()
      .single();

    const trackLink = data
      ? `${window.location.origin}/r/${restaurant.slug}?ref=${data.id}`
      : reviewLink;

    const message = encodeURIComponent(
      `¡Hola! 😊 Fue un placer tenerte en ${restaurant.name}.\n\nSi disfrutaste tu experiencia, nos encantaría que nos dejaras una reseña en Google. ¡Solo toma un momento y significa mucho para nosotros! ⭐\n\n👉 ${trackLink}\n\n¡Te esperamos pronto! 🙌`
    );

    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");

    setPhone("");
    setSent(true);
    setSending(false);
    setStats((prev) => ({ ...prev, total_sent: prev.total_sent + 1 }));

    setTimeout(() => setSent(false), 3000);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(reviewLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  async function openBillingPortal() {
    setPortalLoading(true);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setPortalLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#C9A84C" }} />
      </div>
    );
  }

  const conversionRate =
    stats.total_sent > 0 ? Math.round((stats.total_clicks / stats.total_sent) * 100) : 0;

  const gold = "#C9A84C";
  const plan = restaurant?.plan || "trial";
  const isPaid = plan === "basic" || plan === "pro";
  const trialDaysLeft = restaurant?.trial_ends_at
    ? Math.ceil((new Date(restaurant.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trial / upgrade banner */}
      {!isPaid && (
        <div className="px-4 py-2.5 text-sm text-center font-medium flex items-center justify-center gap-3 flex-wrap"
          style={{ background: plan === "trial" && trialDaysLeft <= 5 ? "#FEF2F2" : "#FDFBF5", color: plan === "trial" && trialDaysLeft <= 5 ? "#DC2626" : "#92752B" }}>
          {plan === "trial"
            ? trialDaysLeft > 0
              ? `⏳ Te quedan ${trialDaysLeft} días de prueba gratis`
              : "⚠️ Tu período de prueba ha vencido"
            : "Tu cuenta está cancelada"}
          <Link href="/upgrade" className="px-3 py-1 rounded-full text-xs font-bold text-white hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}>
            Ver planes →
          </Link>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: gold, fill: gold }} />
            <span className="text-xl font-bold tracking-tight text-gray-900">Reputop</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block font-medium">{restaurant?.name}</span>
            {isPaid && (
              <button onClick={openBillingPortal} disabled={portalLoading}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">
                <CreditCard className="w-3.5 h-3.5" />
                {portalLoading ? "..." : "Facturación"}
              </button>
            )}
            {!isPaid && (
              <Link href="/upgrade" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}>
                <Crown className="w-3.5 h-3.5" /> Actualizar plan
              </Link>
            )}
            <Link href="/settings" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <Settings className="w-4 h-4" /> Configuración
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hola, {restaurant?.name} 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Gestiona tus reseñas y mira cómo crece tu reputación</p>
        </div>

        {/* Onboarding */}
        <OnboardingChecklist
          hasGoogleUrl={!!(restaurant?.google_url && restaurant.google_url !== "https://maps.google.com")}
          hasSentFirst={stats.total_sent > 0}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<Send className="w-4 h-4" style={{ color: gold }} />} label="Links enviados" value={stats.total_sent} gold={gold} />
          <StatCard icon={<Users className="w-4 h-4" style={{ color: gold }} />} label="Clientes que hicieron clic" value={stats.total_clicks} gold={gold} />
          <StatCard icon={<BarChart2 className="w-4 h-4" style={{ color: gold }} />} label="Tasa de conversión" value={`${conversionRate}%`} gold={gold} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#F0FDF4" }}>
                <MessageCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Enviar por WhatsApp</h2>
                <p className="text-xs text-gray-400">Ingresa el número del cliente</p>
              </div>
            </div>
            <form onSubmit={sendWhatsApp} className="flex flex-col gap-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: 5491112345678 (con código de país)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": gold } as React.CSSProperties}
                required
              />
              <button
                type="submit"
                disabled={sending || !phone}
                className="flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                {sent ? <><CheckCircle className="w-4 h-4" />¡Enviado!</> : <><MessageCircle className="w-4 h-4" />{sending ? "Abriendo WhatsApp..." : "Enviar por WhatsApp"}</>}
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">Se abrirá WhatsApp con el mensaje listo para enviar.</p>
          </div>

          {/* Link */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
                <Star className="w-5 h-5" style={{ color: gold }} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Tu link de reseñas</h2>
                <p className="text-xs text-gray-400">Compártelo donde quieras</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500 break-all mb-3 border border-gray-100 font-mono">
              {reviewLink || "Cargando..."}
            </div>
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-2 w-full font-medium py-3 rounded-xl border transition-all text-sm"
              style={copied ? { background: "#F0FDF4", color: "#16a34a", borderColor: "#bbf7d0" } : { borderColor: "#E8D5A3", color: "#A07830", background: "#FDFBF5" }}
            >
              {copied ? <><CheckCircle className="w-4 h-4" />¡Copiado!</> : <><Copy className="w-4 h-4" />Copiar link</>}
            </button>
            <p className="text-xs text-gray-400 mt-3">Cada clic se registra en tus estadísticas.</p>
          </div>
        </div>

        {/* QR */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
              <QrCode className="w-5 h-5" style={{ color: gold }} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Código QR para tu mesa</h2>
              <p className="text-xs text-gray-400">Imprímelo — el cliente escanea y deja su reseña</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {qrUrl && <img src={qrUrl} alt="QR" className="w-36 h-36 rounded-xl border border-gray-100" />}
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-sm text-gray-400 leading-relaxed">
                Ponlo en la mesa, en la cuenta o en la entrada. El cliente escanea y va directo a Google Maps.
              </p>
              <a
                href={qrUrl}
                download={`qr-${restaurant?.name}.png`}
                className="flex items-center justify-center gap-2 text-white font-medium py-3 rounded-xl transition-all hover:opacity-90 text-sm"
                style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
              >
                <Download className="w-4 h-4" />
                Descargar QR
              </a>
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 text-sm mb-4">Historial de envíos</h2>
          {history.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Aún no has enviado ningún link. ¡Empieza hoy!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium">Teléfono</th>
                    <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium">Fecha</th>
                    <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-700 text-sm">{item.phone || "—"}</td>
                      <td className="py-3 px-2 text-gray-400 text-sm">
                        {new Date(item.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-3 px-2">
                        {item.clicked ? (
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" /> Hizo clic
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "#FDFBF5", color: "#A07830" }}>
                            Pendiente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, gold }: { icon: React.ReactNode; label: string; value: number | string; gold: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}

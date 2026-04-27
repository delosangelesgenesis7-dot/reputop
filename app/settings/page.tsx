"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, CheckCircle, ArrowLeft, Store, Link2, Mail, Save } from "lucide-react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

const GOLD = "#C9A84C";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  const [name, setName] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: rest } = await supabase
        .from("restaurants")
        .select("id, name, google_url, email")
        .eq("user_id", user.id)
        .single();

      if (rest) {
        setRestaurantId(rest.id);
        setName(rest.name || "");
        setGoogleUrl(rest.google_url || "");
        setEmail(rest.email || user.email || "");
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("El nombre no puede estar vacío."); return; }
    if (!googleUrl.trim() || !googleUrl.startsWith("http")) {
      setError("Ingresa un link de Google Maps válido (debe empezar con http).");
      return;
    }

    setSaving(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase
      .from("restaurants")
      .update({ name: name.trim(), google_url: googleUrl.trim() })
      .eq("id", restaurantId);

    if (err) {
      setError("Error al guardar. Intenta de nuevo.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: GOLD }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: GOLD, fill: GOLD }} />
            <span className="text-xl font-bold tracking-tight text-gray-900">Reputop</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al panel
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Configuración</h1>
          <p className="text-gray-400 text-sm mt-1">Actualiza la información de tu restaurante</p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          {/* Nombre */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
                <Store className="w-4 h-4" style={{ color: GOLD }} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Nombre del restaurante</h2>
                <p className="text-xs text-gray-400">Aparece en el mensaje de WhatsApp</p>
              </div>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: La Parrilla del Chef"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": GOLD } as React.CSSProperties}
            />
          </div>

          {/* Google Maps URL */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
                <Link2 className="w-4 h-4" style={{ color: GOLD }} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Link de Google Maps</h2>
                <p className="text-xs text-gray-400">A donde se redirige el cliente para dejar su reseña</p>
              </div>
            </div>
            <input
              type="url"
              value={googleUrl}
              onChange={(e) => setGoogleUrl(e.target.value)}
              placeholder="https://maps.google.com/?cid=..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": GOLD } as React.CSSProperties}
            />
            <p className="text-xs text-gray-400 mt-2">
              En Google Maps, busca tu restaurante → comparte → copia el link corto.
            </p>
          </div>

          {/* Email (solo lectura) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
                <Mail className="w-4 h-4" style={{ color: GOLD }} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Email de la cuenta</h2>
                <p className="text-xs text-gray-400">No se puede cambiar desde aquí</p>
              </div>
            </div>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
          >
            {saved
              ? <><CheckCircle className="w-4 h-4" /> ¡Guardado!</>
              : <><Save className="w-4 h-4" /> {saving ? "Guardando..." : "Guardar cambios"}</>
            }
          </button>
        </form>
      </main>
    </div>
  );
}

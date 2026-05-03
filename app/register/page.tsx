"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Star, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { industries } from "@/lib/industries";

const GOLD = "#C9A84C";

const BUSINESS_TYPES = [
  { value: "restaurantes", label: "🍽️ Restaurante" },
  { value: "bares", label: "🍹 Bar / Bar-Restaurante / Nocturno" },
  { value: "cafeterias", label: "☕ Cafetería" },
  { value: "salones", label: "💇‍♀️ Salón de belleza" },
  { value: "minimarket", label: "🛒 Minimarket / Tienda" },
  { value: "clinicas", label: "🏥 Clínica / Consultorio" },
  { value: "gimnasios", label: "💪 Gimnasio" },
  { value: "otro", label: "🏪 Otro negocio" },
];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const industryParam = searchParams.get("industry") || "restaurantes";

  const industry = industries[industryParam];
  const accentColor = industry?.color || GOLD;

  const [form, setForm] = useState({
    businessName: "",
    email: "",
    password: "",
    googleUrl: "",
    businessType: industryParam,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          restaurant_name: form.businessName,
          google_url: form.googleUrl,
          business_type: form.businessType,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("restaurants").insert({
        user_id: data.user.id,
        name: form.businessName,
        google_url: form.googleUrl,
        email: form.email,
        business_type: form.businessType,
      });
      router.push("/dashboard");
    }
  }

  const businessLabel = industry ? `tu ${industry.name}` : "tu negocio";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Star className="w-6 h-6" style={{ color: GOLD, fill: GOLD }} />
          <span className="text-2xl font-bold text-gray-900">Reputop</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crea tu cuenta gratis</h1>
          <p className="text-gray-500 mb-6">Empieza a recibir más reseñas en Google hoy</p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de negocio</label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
              >
                {BUSINESS_TYPES.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de {businessLabel}</label>
              <input
                type="text"
                name="businessName"
                required
                value={form.businessName}
                onChange={handleChange}
                placeholder={`Ej: ${industry?.name === "salón de belleza" ? "Studio Glam" : industry?.name === "bar" ? "Bar La Esquina" : "La Parrilla del Chef"}`}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@negocio.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent pr-12"
                  style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link de Google Maps de {businessLabel}
              </label>
              <input
                type="url"
                name="googleUrl"
                required
                value={form.googleUrl}
                onChange={handleChange}
                placeholder="https://g.page/r/..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
              />
              <p className="text-xs text-gray-400 mt-1">Búscate en Google Maps → Compartir → Copiar link</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 mt-2"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: accentColor }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: GOLD }} /></div>}>
      <RegisterForm />
    </Suspense>
  );
}

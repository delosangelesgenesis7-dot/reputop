"use client";

import Link from "next/link";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import { industries } from "@/lib/industries";

const GOLD = "#C9A84C";

export default function IndustryLanding({ industrySlug }: { industrySlug: string }) {
  const industry = industries[industrySlug];
  return (
    <div className="min-h-screen bg-white">
      {/* Urgency bar */}
      <div className="text-center py-2.5 text-xs font-semibold text-white" style={{ background: "linear-gradient(90deg, #1a1a1a, #2a2a2a)" }}>
        🔥 Oferta de lanzamiento: 30 días gratis sin tarjeta — Solo quedan <span style={{ color: GOLD }}>7 lugares</span> disponibles este mes
      </div>

      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: GOLD, fill: GOLD }} />
            <span className="text-xl font-bold tracking-tight text-gray-900">Reputop</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">Iniciar sesión</Link>
            <Link href={`/register?industry=${industry.slug}`}
              className="text-sm font-semibold px-4 py-2 rounded-full text-white hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${industry.color}, ${industry.color}cc)` }}>
              Empezar gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: "#FDFBF5", color: GOLD, border: "1px solid #E8D5A3" }}>
          {industry.emoji} La herramienta #1 para reseñas en {industry.namePlural}
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6" style={{ whiteSpace: "pre-line" }}>
          {industry.headline.split("\n")[0]}<br />
          <span style={{ color: industry.color }}>{industry.headline.split("\n")[1]}</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">{industry.subheadline}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link href={`/register?industry=${industry.slug}`}
            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-white hover:opacity-90 transition-all"
            style={{ background: `linear-gradient(135deg, ${industry.color}, ${industry.color}bb)` }}>
            Comenzar 30 días gratis <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/demo"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
            Ver demo
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" style={{ fill: GOLD, color: GOLD }} />)}
        </div>
        <p className="text-xs text-gray-400">4.9 · Más de 500 {industry.namePlural} confían en Reputop</p>
      </section>

      {/* Stat highlight */}
      <section className="py-12" style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-6xl font-black mb-2" style={{ color: industry.color }}>{industry.heroStat}</p>
          <p className="text-white text-lg font-medium">{industry.heroStatLabel}</p>
          <p className="text-gray-400 text-sm mt-2">promedio de nuestros clientes en {industry.namePlural}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { n: "1", title: "Termina el servicio", desc: `El cliente sale feliz de tu ${industry.name}.` },
            { n: "2", title: "Envías el WhatsApp", desc: "Un mensaje cálido con su link personalizado. 10 segundos." },
            { n: "3", title: "El cliente deja su reseña", desc: "Un clic y va directo a Google Maps. Sin fricción." },
          ].map((s) => (
            <div key={s.n} className="text-center p-6 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-lg mx-auto mb-4"
                style={{ background: `linear-gradient(135deg, ${industry.color}, ${industry.color}bb)` }}>
                {s.n}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Todo lo que incluye</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {industry.features.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: industry.color }} />
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {industry.testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" style={{ fill: GOLD, color: GOLD }} />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.business}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5" style={{ fill: GOLD, color: GOLD }} />)}
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{industry.registerTitle}</h2>
          <p className="text-gray-400 text-sm mb-6">{industry.registerSubtitle}</p>
          <Link href={`/register?industry=${industry.slug}`}
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-gray-900 hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${industry.color}, ${industry.color}cc)` }}>
            Crear mi cuenta gratis <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-500 text-xs mt-3">Sin tarjeta · 30 días gratis · Cancela cuando quieras</p>
        </div>
      </section>
    </div>
  );
}

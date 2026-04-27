"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Check, Zap, Crown } from "lucide-react";
import Link from "next/link";

const GOLD = "#C9A84C";

export default function UpgradePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<"basic" | "pro" | null>(null);

  async function subscribe(plan: "basic" | "pro") {
    setLoading(plan);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error al procesar el pago. Intenta de nuevo.");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: GOLD, fill: GOLD }} />
            <span className="text-xl font-bold tracking-tight text-gray-900">Reputop</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-700">
            ← Volver al panel
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
            Elige tu plan
          </h1>
          <p className="text-gray-400">Sin permanencia. Cancela cuando quieras.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Basic */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Basic</h2>
                <p className="text-xs text-gray-400">Para empezar</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$20</span>
              <span className="text-gray-400 text-sm">/mes</span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {[
                "Envío de links por WhatsApp",
                "Código QR para tu mesa",
                "Historial de envíos",
                "Estadísticas básicas",
                "Hasta 100 envíos/mes",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => subscribe("basic")}
              disabled={loading !== null}
              className="w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all disabled:opacity-60"
              style={{ borderColor: "#3B82F6", color: "#3B82F6" }}
            >
              {loading === "basic" ? "Redirigiendo..." : "Empezar con Basic"}
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl p-8 flex flex-col relative overflow-hidden" style={{ background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)" }}>
            <div className="absolute top-4 right-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-gray-900" style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)" }}>
                MÁS POPULAR
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(201,168,76,0.15)" }}>
                <Crown className="w-5 h-5" style={{ color: GOLD }} />
              </div>
              <div>
                <h2 className="font-bold text-white">Pro</h2>
                <p className="text-xs text-gray-400">Para crecer rápido</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$40</span>
              <span className="text-gray-400 text-sm">/mes</span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {[
                "Todo lo de Basic",
                "Envíos ilimitados",
                "Reporte semanal por email",
                "Respuestas automáticas",
                "Soporte prioritario",
                "Próximamente: más canales",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: GOLD }} />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => subscribe("pro")}
              disabled={loading !== null}
              className="w-full py-3 rounded-xl font-bold text-sm text-gray-900 transition-all disabled:opacity-60 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
            >
              {loading === "pro" ? "Redirigiendo..." : "Empezar con Pro"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Pago seguro con Stripe · Sin tarjeta sin cargo · Cancela en 1 clic
        </p>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Send, Copy, BarChart2, MessageCircle, CheckCircle, Users, QrCode, Download, ArrowRight, Lock } from "lucide-react";

const GOLD = "#C9A84C";

const fakeHistory = [
  { id: "1", phone: "+54 9 11 4523-8891", clicked: true, created_at: "2025-04-25T14:30:00Z" },
  { id: "2", phone: "+54 9 11 7734-2210", clicked: true, created_at: "2025-04-25T13:10:00Z" },
  { id: "3", phone: "+54 9 11 9981-4456", clicked: false, created_at: "2025-04-25T12:00:00Z" },
  { id: "4", phone: "+54 9 11 3312-7789", clicked: true, created_at: "2025-04-24T20:15:00Z" },
  { id: "5", phone: "+54 9 11 5567-1123", clicked: false, created_at: "2025-04-24T19:45:00Z" },
];

export default function DemoPage() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const reviewLink = "https://reputop.com/r/la-parrilla-demo";

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setPhone("");
    setTimeout(() => {
      setSent(false);
      setShowModal(true);
    }, 1500);
  }

  function copyLink() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner demo */}
      <div className="text-center py-3 text-sm font-medium text-white flex items-center justify-center gap-3" style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}>
        <span>👀 Estás viendo una demo interactiva de Reputop</span>
        <Link
          href="/register"
          className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-900 hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
        >
          Crear mi cuenta gratis <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: GOLD, fill: GOLD }} />
            <span className="text-xl font-bold tracking-tight text-gray-900">Reputop</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full ml-1" style={{ background: "#FDFBF5", color: GOLD, border: "1px solid #E8D5A3" }}>DEMO</span>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full text-white hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
          >
            Crear mi cuenta gratis
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hola, La Parrilla del Chef 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Gestiona tus reseñas y mira cómo crece tu reputación</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<Send className="w-4 h-4" style={{ color: GOLD }} />} label="Links enviados" value={248} />
          <StatCard icon={<Users className="w-4 h-4" style={{ color: GOLD }} />} label="Clientes que hicieron clic" value={189} />
          <StatCard icon={<BarChart2 className="w-4 h-4" style={{ color: GOLD }} />} label="Tasa de conversión" value="76%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-50">
                <MessageCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Enviar por WhatsApp</h2>
                <p className="text-xs text-gray-400">Prueba ingresando un número</p>
              </div>
            </div>
            <form onSubmit={handleSend} className="flex flex-col gap-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: 5491112345678 (con código de país)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={!phone}
                className="flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                {sent ? <><CheckCircle className="w-4 h-4" />¡Enviado!</> : <><MessageCircle className="w-4 h-4" />Enviar por WhatsApp</>}
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3">En tu cuenta real se abrirá WhatsApp con el mensaje listo.</p>
          </div>

          {/* Link */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
                <Star className="w-5 h-5" style={{ color: GOLD }} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Tu link de reseñas</h2>
                <p className="text-xs text-gray-400">Compártelo donde quieras</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500 break-all mb-3 border border-gray-100 font-mono">
              {reviewLink}
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
              <QrCode className="w-5 h-5" style={{ color: GOLD }} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Código QR para tu mesa</h2>
              <p className="text-xs text-gray-400">Imprímelo — el cliente escanea y deja su reseña</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-36 h-36 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center">
              <QrCode className="w-20 h-20 text-gray-300" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-sm text-gray-400 leading-relaxed">En tu cuenta real puedes descargar el QR personalizado de tu restaurante e imprimirlo para ponerlo en las mesas.</p>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 text-white font-medium py-3 rounded-xl transition-all hover:opacity-90 text-sm"
                style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
              >
                <Download className="w-4 h-4" />
                Descargar QR
              </button>
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 text-sm mb-4">Historial de envíos</h2>
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
                {fakeHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 text-gray-700 text-sm">{item.phone}</td>
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
        </div>

        {/* CTA bottom */}
        <div className="mt-8 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5" style={{ fill: GOLD, color: GOLD }} />)}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">¿Te gustó lo que viste?</h3>
          <p className="text-gray-400 text-sm mb-6">Crea tu cuenta gratis y empieza a recibir más reseñas hoy mismo.</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-gray-900 hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)" }}
          >
            Crear mi cuenta gratis — 30 días sin costo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-500 text-xs mt-3">Sin tarjeta de crédito · Cancela cuando quieras</p>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#FDFBF5" }}>
              <Lock className="w-7 h-7" style={{ color: GOLD }} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Función disponible en tu cuenta</h3>
            <p className="text-gray-400 text-sm mb-6">Esta es una demo. Crea tu cuenta gratis para acceder a todas las funciones con los datos reales de tu restaurante.</p>
            <Link
              href="/register"
              className="block font-semibold py-3 rounded-xl text-white hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
            >
              Crear cuenta gratis
            </Link>
            <button onClick={() => setShowModal(false)} className="mt-3 text-sm text-gray-400 hover:text-gray-600 w-full">
              Seguir explorando la demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
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

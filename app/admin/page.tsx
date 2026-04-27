"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Star, Users, TrendingUp, CheckCircle, Clock, LogOut, Lock } from "lucide-react";

const ADMIN_PASSWORD = "Gene.123";
const GOLD = "#C9A84C";

interface Restaurant {
  id: string;
  name: string;
  email: string;
  plan: string;
  trial_ends_at: string;
  created_at: string;
  total_sent?: number;
  total_clicks?: number;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      loadData();
    } else {
      setError("Contraseña incorrecta.");
    }
  }

  async function loadData() {
    setLoading(true);
    const supabase = createClient();

    const { data: rests } = await supabase
      .from("restaurants")
      .select("*")
      .order("created_at", { ascending: false });

    if (rests) {
      const withStats = await Promise.all(
        rests.map(async (r) => {
          const { data: requests } = await supabase
            .from("review_requests")
            .select("id, clicked")
            .eq("restaurant_id", r.id);
          return {
            ...r,
            total_sent: requests?.length || 0,
            total_clicks: requests?.filter((x) => x.clicked).length || 0,
          };
        })
      );
      setRestaurants(withStats);
    }
    setLoading(false);
  }

  async function changePlan(id: string, plan: string) {
    const supabase = createClient();
    await supabase.from("restaurants").update({ plan }).eq("id", id);
    setRestaurants((prev) => prev.map((r) => r.id === id ? { ...r, plan } : r));
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Star className="w-6 h-6" style={{ color: GOLD, fill: GOLD }} />
            <span className="text-2xl font-bold tracking-tight text-gray-900">Reputop</span>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
                <Lock className="w-6 h-6" style={{ color: GOLD }} />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Panel de administración</h1>
            <p className="text-gray-400 text-sm text-center mb-6">Solo acceso autorizado</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de administrador"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                className="text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const total = restaurants.length;
  const activos = restaurants.filter((r) => r.plan === "basic" || r.plan === "pro").length;
  const enTrial = restaurants.filter((r) => r.plan === "trial").length;
  const trialVenciendo = restaurants.filter((r) => {
    if (r.plan !== "trial") return false;
    const days = Math.ceil((new Date(r.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days <= 5 && days >= 0;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5" style={{ color: GOLD, fill: GOLD }} />
            <span className="text-xl font-bold tracking-tight text-gray-900">Reputop</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: GOLD }}>ADMIN</span>
          </div>
          <button onClick={() => setAuthenticated(false)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Panel de administración</h1>
          <p className="text-gray-400 text-sm mt-1">Gestiona todos los restaurantes de Reputop</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <AdminStat icon={<Users className="w-4 h-4" style={{ color: GOLD }} />} label="Total registrados" value={total} />
          <AdminStat icon={<CheckCircle className="w-4 h-4 text-green-500" />} label="Clientes pagando" value={activos} />
          <AdminStat icon={<Clock className="w-4 h-4 text-blue-400" />} label="En período de prueba" value={enTrial} />
          <AdminStat icon={<TrendingUp className="w-4 h-4 text-red-400" />} label="Trial venciendo (5 días)" value={trialVenciendo} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Todos los restaurantes</h2>
          </div>
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2" style={{ borderColor: GOLD }} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Restaurante</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Plan</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Trial vence</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Links</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Clics</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Registrado</th>
                    <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Cambiar plan</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((r) => {
                    const daysLeft = Math.ceil((new Date(r.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    const isExpired = daysLeft < 0;
                    const isUrgent = daysLeft <= 5 && daysLeft >= 0;
                    return (
                      <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{r.name}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{r.email}</td>
                        <td className="py-3 px-4"><PlanBadge plan={r.plan} /></td>
                        <td className="py-3 px-4">
                          {r.plan === "trial" ? (
                            <span className={`text-xs font-medium ${isExpired ? "text-red-500" : isUrgent ? "text-orange-500" : "text-gray-400"}`}>
                              {isExpired ? "Vencido" : `${daysLeft} días`}
                            </span>
                          ) : <span className="text-xs text-gray-300">—</span>}
                        </td>
                        <td className="py-3 px-4 text-gray-600 font-medium">{r.total_sent}</td>
                        <td className="py-3 px-4 text-gray-600 font-medium">{r.total_clicks}</td>
                        <td className="py-3 px-4 text-gray-400 text-xs">
                          {new Date(r.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={r.plan}
                            onChange={(e) => changePlan(r.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none cursor-pointer"
                          >
                            <option value="trial">Trial</option>
                            <option value="basic">Basic</option>
                            <option value="pro">Pro</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  {restaurants.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                        Aún no hay restaurantes registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function AdminStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    trial: { bg: "#EFF6FF", color: "#3B82F6", label: "Trial" },
    basic: { bg: "#F0FDF4", color: "#16A34A", label: "Basic" },
    pro: { bg: "#FDFBF5", color: "#C9A84C", label: "Pro" },
    cancelled: { bg: "#FEF2F2", color: "#EF4444", label: "Cancelado" },
  };
  const s = styles[plan] || styles.trial;
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

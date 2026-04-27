"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, Settings, MessageCircle, QrCode, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const GOLD = "#C9A84C";
const STORAGE_KEY = "reputop_onboarding_dismissed";

interface Props {
  hasSentFirst: boolean;
  hasGoogleUrl: boolean;
}

export default function OnboardingChecklist({ hasSentFirst, hasGoogleUrl }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  const allDone = hasGoogleUrl && hasSentFirst;

  // Auto-hide after all steps complete
  useEffect(() => {
    if (allDone) {
      const t = setTimeout(dismiss, 4000);
      return () => clearTimeout(t);
    }
  }, [allDone]);

  if (!visible) return null;

  const steps = [
    {
      done: hasGoogleUrl,
      icon: <Settings className="w-4 h-4" />,
      title: "Verifica tu link de Google Maps",
      desc: "Asegúrate de que apunta a tu negocio.",
      action: <Link href="/settings" className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: GOLD }}>Ir a configuración <ChevronRight className="w-3 h-3" /></Link>,
    },
    {
      done: hasSentFirst,
      icon: <MessageCircle className="w-4 h-4" />,
      title: "Envía tu primer link por WhatsApp",
      desc: "Ingresa un número y pruébalo tú mismo.",
      action: null,
    },
    {
      done: false,
      icon: <QrCode className="w-4 h-4" />,
      title: "Descarga tu código QR",
      desc: "Ponlo en tu mesa para que los clientes escaneen.",
      action: null,
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;

  return (
    <div className="mb-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}>
            {completedCount}/3
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">
              {allDone ? "¡Todo listo! 🎉" : "Primeros pasos"}
            </h2>
            <p className="text-xs text-gray-400">
              {allDone ? "Ya tienes todo configurado para recibir reseñas." : "Configura tu cuenta en 3 pasos rápidos"}
            </p>
          </div>
        </div>
        <button onClick={dismiss} className="text-gray-300 hover:text-gray-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-1 transition-all duration-500"
          style={{ width: `${(completedCount / 3) * 100}%`, background: "linear-gradient(90deg, #C9A84C, #A07830)" }}
        />
      </div>

      {/* Steps */}
      <div className="divide-y divide-gray-50">
        {steps.map((step, i) => (
          <div key={i} className={`flex items-start gap-4 px-6 py-4 transition-colors ${step.done ? "opacity-50" : ""}`}>
            <div className="flex-shrink-0 mt-0.5">
              {step.done
                ? <CheckCircle className="w-5 h-5 text-green-500" />
                : <Circle className="w-5 h-5 text-gray-200" />
              }
            </div>
            <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
              style={{ background: step.done ? "#F0FDF4" : "#FDFBF5", color: step.done ? "#16A34A" : GOLD }}>
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${step.done ? "line-through text-gray-400" : "text-gray-900"}`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
              {!step.done && step.action && <div className="mt-2">{step.action}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

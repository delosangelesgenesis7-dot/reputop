"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const GOLD = "#C9A84C";

export default function ReviewInterstitial({
  restaurantName,
  googleUrl,
}: {
  restaurantName: string;
  googleUrl: string;
}) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = googleUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [googleUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-sm w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Star className="w-5 h-5" style={{ color: GOLD, fill: GOLD }} />
          <span className="text-lg font-bold tracking-tight text-gray-400">Reputop</span>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-10 h-10 animate-pulse"
              style={{ color: GOLD, fill: GOLD, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          ¡Gracias por visitarnos!
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Tu opinión ayuda a <span className="font-semibold text-gray-700">{restaurantName}</span> a crecer.<br />
          ¡Solo toma un momento y significa mucho! 🙌
        </p>

        {/* CTA button */}
        <button
          onClick={() => { window.location.href = googleUrl; }}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all hover:opacity-90 shadow-lg mb-4"
          style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)", boxShadow: "0 8px 24px rgba(201,168,76,0.3)" }}
        >
          ⭐ Dejar mi reseña en Google
        </button>

        {/* Countdown */}
        <p className="text-xs text-gray-300">
          {countdown > 0 ? `Redirigiendo en ${countdown}...` : "Redirigiendo..."}
        </p>
      </div>
    </div>
  );
}

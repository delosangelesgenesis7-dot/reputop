import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase-server";

export async function POST() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Resend no configurado" }, { status: 503 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createClient();

  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("id, name, email");

  if (!restaurants) return NextResponse.json({ ok: false });

  for (const restaurant of restaurants) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: requests } = await supabase
      .from("review_requests")
      .select("clicked")
      .eq("restaurant_id", restaurant.id)
      .gte("created_at", oneWeekAgo.toISOString());

    const sent = requests?.length || 0;
    const clicks = requests?.filter((r) => r.clicked).length || 0;
    const rate = sent > 0 ? Math.round((clicks / sent) * 100) : 0;

    await resend.emails.send({
      from: "Reputop <reportes@reputop.com>",
      to: restaurant.email,
      subject: `Tu reporte semanal de reseñas — ${restaurant.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px">
          <div style="background:#f97316;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
            <h1 style="color:white;margin:0;font-size:24px">⭐ Reputop</h1>
            <p style="color:#fed7aa;margin:8px 0 0">Reporte semanal</p>
          </div>

          <h2 style="color:#111;font-size:20px">Hola, ${restaurant.name} 👋</h2>
          <p style="color:#6b7280">Aquí está tu resumen de esta semana:</p>

          <div style="display:flex;gap:12px;margin:24px 0">
            <div style="flex:1;background:#fff7ed;border-radius:12px;padding:16px;text-align:center">
              <p style="font-size:32px;font-weight:bold;color:#f97316;margin:0">${sent}</p>
              <p style="color:#6b7280;font-size:14px;margin:4px 0 0">Links enviados</p>
            </div>
            <div style="flex:1;background:#f0fdf4;border-radius:12px;padding:16px;text-align:center">
              <p style="font-size:32px;font-weight:bold;color:#22c55e;margin:0">${clicks}</p>
              <p style="color:#6b7280;font-size:14px;margin:4px 0 0">Clientes que hicieron clic</p>
            </div>
            <div style="flex:1;background:#eff6ff;border-radius:12px;padding:16px;text-align:center">
              <p style="font-size:32px;font-weight:bold;color:#3b82f6;margin:0">${rate}%</p>
              <p style="color:#6b7280;font-size:14px;margin:4px 0 0">Tasa de conversión</p>
            </div>
          </div>

          <a href="https://reputop.com/dashboard"
             style="display:block;background:#f97316;color:white;text-align:center;padding:14px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px">
            Ver mi dashboard completo →
          </a>

          <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:24px">
            Reputop · Más reseñas para tu restaurante
          </p>
        </div>
      `,
    });
  }

  return NextResponse.json({ ok: true, sent: restaurants.length });
}

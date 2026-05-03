import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, error: "Resend no configurado" });
  }

  const { businessName, businessType, email } = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  const typeLabels: Record<string, string> = {
    restaurantes: "🍽️ Restaurante",
    bares: "🍹 Bar / Nocturno",
    cafeterias: "☕ Cafetería",
    salones: "💇‍♀️ Salón de belleza",
    minimarket: "🛒 Minimarket / Tienda",
    clinicas: "🏥 Clínica / Consultorio",
    gimnasios: "💪 Gimnasio",
    otro: "🏪 Otro negocio",
  };

  const typeLabel = typeLabels[businessType] || businessType;
  const now = new Date().toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await resend.emails.send({
    from: "Reputop <onboarding@resend.dev>",
    to: "delosangelesgenesis7@gmail.com",
    subject: `🎉 Nuevo registro en Reputop — ${businessName}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <div style="background:linear-gradient(135deg,#C9A84C,#A07830);border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
          <h1 style="color:white;margin:0;font-size:22px">⭐ Reputop</h1>
          <p style="color:#fed7aa;margin:6px 0 0;font-size:13px">Nuevo negocio registrado</p>
        </div>

        <h2 style="color:#111;font-size:18px;margin-bottom:4px">¡Tienes un nuevo cliente! 🎉</h2>
        <p style="color:#6b7280;font-size:14px;margin-bottom:20px">Se acaba de registrar en Reputop:</p>

        <div style="background:#f9fafb;border-radius:12px;padding:20px;border:1px solid #e5e7eb;margin-bottom:20px">
          <table style="width:100%;font-size:14px">
            <tr>
              <td style="color:#6b7280;padding:6px 0;width:120px">Negocio</td>
              <td style="color:#111;font-weight:600">${businessName}</td>
            </tr>
            <tr>
              <td style="color:#6b7280;padding:6px 0">Tipo</td>
              <td style="color:#111">${typeLabel}</td>
            </tr>
            <tr>
              <td style="color:#6b7280;padding:6px 0">Email</td>
              <td style="color:#111">${email}</td>
            </tr>
            <tr>
              <td style="color:#6b7280;padding:6px 0">Registrado</td>
              <td style="color:#111">${now}</td>
            </tr>
          </table>
        </div>

        <a href="https://reputop.vercel.app/admin"
           style="display:block;background:linear-gradient(135deg,#C9A84C,#A07830);color:white;text-align:center;padding:13px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:14px">
          Ver panel de administración →
        </a>

        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:20px">
          Reputop · Panel de administración
        </p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}

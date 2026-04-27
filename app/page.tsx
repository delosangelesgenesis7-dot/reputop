import Link from "next/link";
import { Star, MessageCircle, BarChart2, ArrowRight, QrCode, CheckCircle, Shield, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Urgency bar */}
      <div className="text-center py-2.5 text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}>
        🔥 Oferta de lanzamiento: 30 días gratis sin tarjeta de crédito — Solo quedan <span className="underline">7 lugares disponibles</span> este mes
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5" style={{ color: "#C9A84C", fill: "#C9A84C" }} />
          <span className="text-xl font-bold tracking-tight text-gray-900">Reputop</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}
          >
            Empezar gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-5xl mx-auto w-full">
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-8 border"
          style={{ color: "#C9A84C", borderColor: "#E8D5A3", background: "#FDFBF5" }}
        >
          <Star className="w-3.5 h-3.5" style={{ fill: "#C9A84C", color: "#C9A84C" }} />
          La herramienta #1 para reseñas en restaurantes
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
          Más reseñas en Google.
          <br />
          <span style={{ color: "#C9A84C" }}>Más clientes nuevos.</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mb-8 leading-relaxed">
          Envía un link personalizado a tus clientes por WhatsApp y llévalos directo a dejar su reseña. Simple, elegante y efectivo.
        </p>

        {/* Guarantee badge */}
        <div className="flex items-center gap-2 mb-8 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600 font-medium">30 días gratis · Sin tarjeta · Cancela cuando quieras</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-14">
          <Link
            href="/register"
            className="flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:opacity-90 shadow-lg"
            style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)", boxShadow: "0 4px 20px rgba(201,168,76,0.35)" }}
          >
            Comenzar 30 días gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-base border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Ver demo
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5" style={{ fill: "#C9A84C", color: "#C9A84C" }} />
            ))}
          </div>
          <span className="text-sm text-gray-400">4.9 · Más de 500 restaurantes confían en Reputop</span>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 w-full max-w-3xl rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.08)" }}>
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-gray-500 text-xs ml-2">dashboard.reputop.com</span>
          </div>
          <div className="bg-gray-50 p-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[{ label: "Links enviados", value: "248" }, { label: "Clientes que hicieron clic", value: "189" }, { label: "Tasa de conversión", value: "76%" }].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">Enviar por WhatsApp</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-400 mb-2">+54 9 11 ...</div>
                <div className="bg-green-500 rounded-lg px-3 py-2 text-xs text-white text-center">Enviar ↗</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">Tu link de reseñas</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-400 mb-2">reputop.com/r/...</div>
                <div className="rounded-lg px-3 py-2 text-xs text-white text-center" style={{ background: "#C9A84C" }}>Copiar link</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>El impacto real</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4 tracking-tight">
            Lo que pasa cuando usas Reputop
          </h2>
          <p className="text-center text-gray-400 mb-14 max-w-lg mx-auto">Restaurantes como el tuyo ya están viendo resultados en las primeras semanas.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Before */}
            <div className="rounded-2xl p-8 border border-gray-700 bg-gray-800">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6">Sin Reputop</p>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-600" />
                ))}
                <span className="text-gray-500 text-sm ml-1">3.2</span>
              </div>
              <p className="text-4xl font-bold text-gray-500 mb-1">12</p>
              <p className="text-gray-500 text-sm mb-6">reseñas en Google</p>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2">❌ Clientes satisfechos que no dejan reseña</li>
                <li className="flex items-center gap-2">❌ Pocas reseñas = menor visibilidad en Google</li>
                <li className="flex items-center gap-2">❌ Competidores con más reseñas te ganan</li>
                <li className="flex items-center gap-2">❌ Sin datos sobre la satisfacción del cliente</li>
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl p-8 border relative overflow-hidden" style={{ borderColor: "#C9A84C", background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}>
              <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#C9A84C", color: "white" }}>Con Reputop</div>
              <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "#C9A84C" }}>Con Reputop</p>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ fill: "#C9A84C", color: "#C9A84C" }} />
                ))}
                <span className="text-white text-sm ml-1">4.8</span>
              </div>
              <p className="text-4xl font-bold text-white mb-1">248</p>
              <p className="text-gray-400 text-sm mb-6">reseñas en Google</p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">✅ Links enviados por WhatsApp en segundos</li>
                <li className="flex items-center gap-2">✅ Mayor visibilidad en búsquedas de Google</li>
                <li className="flex items-center gap-2">✅ Más clientes nuevos cada semana</li>
                <li className="flex items-center gap-2">✅ Estadísticas y reportes semanales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>Características</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14 tracking-tight">Todo lo que necesitas para crecer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon={<MessageCircle className="w-6 h-6" style={{ color: "#C9A84C" }} />} title="Envío por WhatsApp" description="Manda el link al cliente con un clic. El mensaje está listo y lleva directo a Google Maps." />
            <FeatureCard icon={<QrCode className="w-6 h-6" style={{ color: "#C9A84C" }} />} title="Código QR para tu mesa" description="Descarga tu QR personalizado, imprímelo y ponlo en las mesas. Sin pedir números." />
            <FeatureCard icon={<BarChart2 className="w-6 h-6" style={{ color: "#C9A84C" }} />} title="Estadísticas en tiempo real" description="Ve cuántos links enviaste, cuántos abrieron el link y tu tasa de conversión semanal." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>Testimonios</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14 tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Carlos Mendoza"
              role="Dueño de La Parrilla del Chef"
              text="En 3 semanas pasamos de 18 a 94 reseñas. Nuestros clientes son felices y ahora lo demuestran. Reputop cambió todo."
              stars={5}
            />
            <TestimonialCard
              name="María González"
              role="Gerente de Café Central"
              text="Lo que más me gusta es que es súper fácil. El mesero manda el link en 5 segundos y listo. Sin complicaciones."
              stars={5}
            />
            <TestimonialCard
              name="Roberto Silva"
              role="Propietario de Sushi Hanami"
              text="Subimos de 3.8 a 4.7 estrellas en Google. Recibimos muchos más clientes nuevos que nos encontraron por las reseñas."
              stars={5}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>Cómo funciona</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14 tracking-tight">Tres pasos. Eso es todo.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Step number="01" title="Regístrate gratis" description="Crea tu cuenta con el nombre y link de Google Maps de tu restaurante en menos de 2 minutos." />
            <Step number="02" title="Obtén tu link y QR" description="Reputop genera automáticamente tu link único y código QR listo para imprimir." />
            <Step number="03" title="Envíalo a tus clientes" description="Manda el link por WhatsApp o pon el QR en la mesa. Las reseñas llegan solas." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>Planes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Simple y transparente</h2>
          <p className="text-gray-400 mb-14">Empieza gratis 30 días. Sin tarjeta de crédito.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PricingCard plan="Básico" price="$20" features={["Dashboard completo", "Envío por WhatsApp", "Código QR descargable", "Estadísticas básicas"]} highlighted={false} />
            <PricingCard plan="Pro" price="$40" features={["Todo lo del plan Básico", "Historial completo de envíos", "Reporte semanal por email", "Soporte prioritario"]} highlighted={true} />
          </div>
          <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-green-500" />
            30 días gratis · Sin tarjeta · Cancela cuando quieras
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9A84C" }}>FAQ</p>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14 tracking-tight">Preguntas frecuentes</h2>
          <div className="flex flex-col gap-4">
            <FAQItem question="¿Es difícil de usar?" answer="No. En menos de 2 minutos tu restaurante está configurado y listo para enviar links. No necesitas conocimientos técnicos." />
            <FAQItem question="¿Funciona para cualquier tipo de restaurante?" answer="Sí. Restaurantes de comida rápida, fine dining, cafés, bares, food trucks — cualquier negocio gastronómico puede usar Reputop." />
            <FAQItem question="¿Qué necesito para empezar?" answer="Solo necesitas el nombre de tu restaurante y el link de Google Maps. Eso es todo." />
            <FAQItem question="¿Qué pasa cuando termina el período de prueba?" answer="Te avisamos antes de que termine. Si quieres continuar eliges un plan. Si no, no te cobramos nada." />
            <FAQItem question="¿Puedo usar Reputop en varios restaurantes?" answer="Sí. Cada restaurante tiene su propia cuenta con su propio dashboard y link personalizado." />
            <FAQItem question="¿Reputop garantiza más reseñas?" answer="Reputop facilita el proceso para que tus clientes dejen reseñas. Los restaurantes que lo usan consistentemente ven un aumento promedio de 20-30 reseñas por mes." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gray-900 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6" style={{ fill: "#C9A84C", color: "#C9A84C" }} />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            ¿Listo para transformar tu reputación?
          </h2>
          <p className="text-gray-400 mb-4">
            Únete a cientos de restaurantes que ya aumentaron sus reseñas con Reputop.
          </p>
          <p className="text-sm font-semibold mb-8" style={{ color: "#C9A84C" }}>
            🔥 Solo quedan 7 lugares gratuitos este mes
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-gray-900 transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)" }}
          >
            Crear cuenta gratis — 30 días sin costo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-500 text-xs mt-4">Sin tarjeta de crédito · Cancela cuando quieras</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-4 h-4" style={{ color: "#C9A84C", fill: "#C9A84C" }} />
          <span className="font-semibold text-gray-700 text-sm">Reputop</span>
        </div>
        <p className="text-gray-400 text-xs">© 2025 Reputop. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-yellow-200 transition-all hover:shadow-md">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "#FDFBF5", border: "1px solid #E8D5A3" }}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl font-bold mb-4" style={{ color: "#E8D5A3" }}>{number}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({ plan, price, features, highlighted }: { plan: string; price: string; features: string[]; highlighted: boolean }) {
  return (
    <div
      className={`rounded-2xl p-8 text-left border transition-all ${highlighted ? "shadow-lg" : "border-gray-200 bg-white"}`}
      style={highlighted ? { background: "linear-gradient(135deg, #FDFBF5, #FFF8E8)", borderColor: "#C9A84C" } : {}}
    >
      {highlighted && (
        <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block" style={{ background: "#C9A84C", color: "white" }}>
          Popular
        </span>
      )}
      <p className="text-gray-500 text-sm font-medium mb-1">{plan}</p>
      <p className="text-4xl font-bold text-gray-900 mb-1">{price}<span className="text-lg text-gray-400 font-normal">/mes</span></p>
      <p className="text-xs text-gray-400 mb-6">por restaurante</p>
      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/register"
        className={`block text-center font-semibold py-3 rounded-full text-sm transition-all ${highlighted ? "text-white hover:opacity-90" : "text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
        style={highlighted ? { background: "linear-gradient(135deg, #C9A84C, #A07830)" } : {}}
      >
        Empezar 30 días gratis
      </Link>
    </div>
  );
}

function TestimonialCard({ name, role, text, stars }: { name: string; role: string; text: string; stars: number }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex gap-1 mb-4">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4" style={{ fill: "#C9A84C", color: "#C9A84C" }} />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">"{text}"</p>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{role}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="bg-white rounded-2xl border border-gray-100 px-6 py-5 group cursor-pointer">
      <summary className="flex items-center justify-between font-semibold text-gray-900 text-sm list-none">
        {question}
        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>
      <p className="text-gray-400 text-sm mt-3 leading-relaxed">{answer}</p>
    </details>
  );
}

export interface Industry {
  slug: string;
  name: string;
  namePlural: string;
  emoji: string;
  headline: string;
  subheadline: string;
  heroStat: string;
  heroStatLabel: string;
  whatsappMessage: (businessName: string, link: string) => string;
  features: string[];
  testimonials: { name: string; business: string; text: string }[];
  registerTitle: string;
  registerSubtitle: string;
  color: string;
}

export const industries: Record<string, Industry> = {
  restaurantes: {
    slug: "restaurantes",
    name: "restaurante",
    namePlural: "restaurantes",
    emoji: "🍽️",
    headline: "Más reseñas en Google.\nMás mesas llenas.",
    subheadline: "Envía un link personalizado a tus comensales por WhatsApp y llévalos directo a dejar su reseña. Simple, elegante y efectivo.",
    heroStat: "+340%",
    heroStatLabel: "más reseñas en 30 días",
    whatsappMessage: (name, link) =>
      `¡Hola! 😊 Fue un placer tenerte en ${name}.\n\nSi disfrutaste tu experiencia, nos encantaría que nos dejaras una reseña en Google. ¡Solo toma un momento y significa mucho para nosotros! ⭐\n\n👉 ${link}\n\n¡Te esperamos pronto! 🙌`,
    features: [
      "Envía links por WhatsApp después de cada servicio",
      "Código QR para poner en la mesa o en la cuenta",
      "Estadísticas de cuántos clientes dejaron reseña",
      "Historial completo de envíos",
    ],
    testimonials: [
      { name: "Carlos M.", business: "La Parrilla del Chef", text: "En 3 semanas pasamos de 47 a 180 reseñas. Ahora aparecemos primeros en Google Maps." },
      { name: "Ana R.", business: "Restaurante El Rincón", text: "Mis clientes lo usan sin problema. El QR en la mesa fue un cambio total." },
    ],
    registerTitle: "Empieza a llenar más mesas",
    registerSubtitle: "30 días gratis · Sin tarjeta · Para tu restaurante",
    color: "#C9A84C",
  },

  salones: {
    slug: "salones",
    name: "salón de belleza",
    namePlural: "salones de belleza",
    emoji: "💇‍♀️",
    headline: "Más reseñas en Google.\nMás clientes nuevas.",
    subheadline: "Después de cada servicio, envía un WhatsApp a tu clienta y llévala directo a dejar su reseña en Google. Sin esfuerzo, sin complicaciones.",
    heroStat: "+280%",
    heroStatLabel: "más reseñas en 30 días",
    whatsappMessage: (name, link) =>
      `¡Hola! 💕 Esperamos que te encante tu nuevo look de ${name}.\n\nSi quedaste feliz con tu servicio, nos encantaría que nos dejaras una reseña en Google. ¡Significa muchísimo para nuestro equipo! ⭐\n\n👉 ${link}\n\n¡Te esperamos en tu próxima visita! ✨`,
    features: [
      "Envía links por WhatsApp después de cada servicio",
      "Código QR para poner en tu recepción o espejo",
      "Estadísticas de conversión en tiempo real",
      "Historial de todas tus clientas",
    ],
    testimonials: [
      { name: "Sofía L.", business: "Studio Glam", text: "Mis clientas encantan dejar reseñas porque el mensaje es súper amigable. En un mes triplicamos las reseñas." },
      { name: "María T.", business: "Salón Belleza Total", text: "Ahora cuando alguien busca salones en mi zona, aparezco primero. Reputop fue clave." },
    ],
    registerTitle: "Haz crecer tu salón con más reseñas",
    registerSubtitle: "30 días gratis · Sin tarjeta · Para tu salón de belleza",
    color: "#E879A0",
  },

  bares: {
    slug: "bares",
    name: "bar",
    namePlural: "bares",
    emoji: "🍹",
    headline: "Más reseñas en Google.\nMás noches llenas.",
    subheadline: "Convierte cada noche memorable en una reseña de 5 estrellas. Envía un link por WhatsApp y que tus clientes hablen por ti.",
    heroStat: "+310%",
    heroStatLabel: "más reseñas en 30 días",
    whatsappMessage: (name, link) =>
      `¡Hola! 🥂 Gracias por pasar la noche con nosotros en ${name}.\n\nSi lo pasaste genial, nos encantaría que nos dejaras una reseña en Google. ¡Nos ayuda un montón y solo toma un momento! ⭐\n\n👉 ${link}\n\n¡Hasta la próxima! 🎉`,
    features: [
      "Envía links por WhatsApp después de cada visita",
      "Código QR para poner en la barra o en las mesas",
      "Estadísticas de cuántos clientes respondieron",
      "Historial de todos tus envíos",
    ],
    testimonials: [
      { name: "Diego F.", business: "Bar La Esquina", text: "Los fines de semana enviamos 50 mensajes. El lunes ya tenemos 15 reseñas nuevas. Increíble." },
      { name: "Laura P.", business: "Cocteles & Co.", text: "Mis clientes son jóvenes y están acostumbrados al WhatsApp. Funciona perfecto." },
    ],
    registerTitle: "Llena tu bar de buenas reseñas",
    registerSubtitle: "30 días gratis · Sin tarjeta · Para tu bar",
    color: "#7C3AED",
  },

  clinicas: {
    slug: "clinicas",
    name: "clínica",
    namePlural: "clínicas y consultorios",
    emoji: "🏥",
    headline: "Más reseñas en Google.\nMás pacientes nuevos.",
    subheadline: "Después de cada consulta, envía un mensaje a tu paciente y llévalos a compartir su experiencia. Construye tu reputación online automáticamente.",
    heroStat: "+260%",
    heroStatLabel: "más reseñas en 30 días",
    whatsappMessage: (name, link) =>
      `¡Hola! 😊 Esperamos que te encuentres muy bien después de tu visita en ${name}.\n\nSi quedaste satisfecho con tu atención, nos encantaría que nos dejaras una reseña en Google. ¡Tu opinión ayuda a otros pacientes a encontrarnos! ⭐\n\n👉 ${link}\n\n¡Hasta pronto y cuídate mucho! 🌟`,
    features: [
      "Envía links por WhatsApp después de cada consulta",
      "Código QR para tu sala de espera",
      "Estadísticas de satisfacción de pacientes",
      "Historial completo de envíos",
    ],
    testimonials: [
      { name: "Dr. Ramírez", business: "Clínica DentalPro", text: "Mis pacientes reciben el mensaje cuando salen de la consulta. La tasa de respuesta es del 60%." },
      { name: "Dra. López", business: "Consulta Médica López", text: "Antes tenía 12 reseñas en Google. Hoy tengo 94. Los pacientes nuevos me dicen que me encontraron ahí." },
    ],
    registerTitle: "Construye la reputación de tu clínica",
    registerSubtitle: "30 días gratis · Sin tarjeta · Para tu clínica o consultorio",
    color: "#0EA5E9",
  },

  gimnasios: {
    slug: "gimnasios",
    name: "gimnasio",
    namePlural: "gimnasios",
    emoji: "💪",
    headline: "Más reseñas en Google.\nMás socios nuevos.",
    subheadline: "Convierte a tus mejores socios en embajadores. Envíales un WhatsApp y llévalos a dejar su reseña en Google con un solo clic.",
    heroStat: "+290%",
    heroStatLabel: "más reseñas en 30 días",
    whatsappMessage: (name, link) =>
      `¡Hola! 💪 Gracias por entrenar con nosotros en ${name}.\n\nSi estás disfrutando tus resultados, nos encantaría que nos dejaras una reseña en Google. ¡Motiva a otros a empezar su cambio! ⭐\n\n👉 ${link}\n\n¡Sigue así, campeón! 🏆`,
    features: [
      "Envía links por WhatsApp a tus socios",
      "Código QR para poner en la entrada o vestuarios",
      "Estadísticas de conversión en tiempo real",
      "Historial de todos tus envíos",
    ],
    testimonials: [
      { name: "Roberto G.", business: "FitZone Gym", text: "Envío mensajes a los socios nuevos después del primer mes. El 70% deja su reseña." },
      { name: "Carla M.", business: "CrossFit Élite", text: "Mi comunidad es muy activa. Con Reputop pasamos de 30 a 150 reseñas en dos meses." },
    ],
    registerTitle: "Haz crecer tu gimnasio con más reseñas",
    registerSubtitle: "30 días gratis · Sin tarjeta · Para tu gimnasio",
    color: "#F97316",
  },

  minimarket: {
    slug: "minimarket",
    name: "minimarket",
    namePlural: "minimarkets y tiendas",
    emoji: "🛒",
    headline: "Más reseñas en Google.\nMás clientes cada día.",
    subheadline: "Cada cliente que pasa por tu caja es una oportunidad. Envíales un WhatsApp y conviértelos en reseñas de 5 estrellas en Google.",
    heroStat: "+250%",
    heroStatLabel: "más reseñas en 30 días",
    whatsappMessage: (name, link) =>
      `¡Hola! 🛒 Gracias por comprar en ${name}.\n\nSi quedaste contento con tu compra y nuestro servicio, nos encantaría que nos dejaras una reseña en Google. ¡Solo toma un momento y nos ayuda muchísimo! ⭐\n\n👉 ${link}\n\n¡Hasta la próxima! 😊`,
    features: [
      "Envía links por WhatsApp a tus clientes habituales",
      "Código QR para poner en la caja o mostrador",
      "Estadísticas de cuántos clientes respondieron",
      "Historial completo de envíos",
    ],
    testimonials: [
      { name: "Jorge M.", business: "Minimarket Don Jorge", text: "Mis clientes de siempre no sabían que podían dejar reseña. Ahora lo hacen y nuevos clientes llegan por eso." },
      { name: "Patricia S.", business: "Tienda La Esquina", text: "En 6 semanas pasamos de 8 reseñas a 67. Ahora aparecemos en Google cuando buscan tiendas cerca." },
    ],
    registerTitle: "Más visibilidad para tu tienda en Google",
    registerSubtitle: "30 días gratis · Sin tarjeta · Para tu minimarket o tienda",
    color: "#10B981",
  },

  cafeterias: {
    slug: "cafeterias",
    name: "cafetería",
    namePlural: "cafeterías",
    emoji: "☕",
    headline: "Más reseñas en Google.\nMás mesas ocupadas.",
    subheadline: "Convierte cada café en una reseña. Envía un WhatsApp rápido a tus clientes y llévalos directo a Google Maps. Sin complicaciones.",
    heroStat: "+300%",
    heroStatLabel: "más reseñas en 30 días",
    whatsappMessage: (name, link) =>
      `¡Hola! ☕ Gracias por visitarnos en ${name}.\n\nEsperamos que hayas disfrutado tu experiencia. Si es así, nos encantaría que nos dejaras una reseña en Google. ¡Significa mucho para nuestro equipo! ⭐\n\n👉 ${link}\n\n¡Hasta pronto! 😊`,
    features: [
      "Envía links por WhatsApp después de cada visita",
      "Código QR para poner en la mesa o mostrador",
      "Estadísticas de conversión en tiempo real",
      "Historial de todos tus envíos",
    ],
    testimonials: [
      { name: "Isabel R.", business: "Café del Aeropuerto", text: "Los viajeros agradecen el buen servicio y están felices de dejar una reseña. Subimos de 3.9 a 4.8 estrellas." },
      { name: "Tomás V.", business: "Cafetería Central", text: "Reputop nos ayudó a destacar entre todas las cafeterías de la zona. Ahora somos los primeros en Google." },
    ],
    registerTitle: "Haz crecer tu cafetería con más reseñas",
    registerSubtitle: "30 días gratis · Sin tarjeta · Para tu cafetería",
    color: "#92400E",
  },
};

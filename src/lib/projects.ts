export interface Project {
  title: string;
  description: string;
  liveUrl: string;
  tags: string[];
  windowClasses: string;
}

export const projects: Project[] = [
  {
    title: "DataPulse Analytics",
    description:
      "Plataforma SaaS para monitorizar métricas financieras en tiempo real y generar reportes colaborativos para el equipo.",
    liveUrl: "https://adventurewebjj.netlify.app/",
    tags: ["Astro", "TypeScript", "Tailwind CSS"],
    windowClasses:
      "md:-rotate-6 md:-translate-y-10 md:-translate-x-6 md:scale-95",
  },
  {
    title: "Savia Naturals",
    description:
      "Ecommerce sostenible diseñado para maximizar la conversión con un diseño editorial y storytelling de marca.",
    liveUrl: "https://fisio-web.netlify.app/",
    tags: ["Next.js", "Contentful", "Stripe"],
    windowClasses: "md:translate-y-6 md:scale-100",
  },
  {
    title: "Loop Studio",
    description:
      "Landing page para agencia digital con foco en storytelling visual, animaciones suaves y captación de leads.",
    liveUrl: "https://web-barberia-clasica.netlify.app/",
    tags: ["Astro", "GSAP", "Framer Motion"],
    windowClasses:
      "md:rotate-6 md:translate-x-8 md:translate-y-16 md:scale-95",
  },
];

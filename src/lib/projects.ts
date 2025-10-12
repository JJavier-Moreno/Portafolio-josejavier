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
      "-rotate-[7deg] group-hover:-translate-y-3 group-hover:rotate-0 group-focus-within:-translate-y-3 group-focus-within:rotate-0",
  },
  {
    title: "Savia Naturals",
    description:
      "Ecommerce sostenible diseñado para maximizar la conversión con un diseño editorial y storytelling de marca.",
    liveUrl: "https://fisio-web.netlify.app/",
    tags: ["Next.js", "Contentful", "Stripe"],
    windowClasses:
      "group-hover:-translate-y-3 group-focus-within:-translate-y-3",
  },
  {
    title: "Loop Studio",
    description:
      "Landing page para agencia digital con foco en storytelling visual, animaciones suaves y captación de leads.",
    liveUrl: "https://web-barberia-clasica.netlify.app/",
    tags: ["Astro", "GSAP", "Framer Motion"],
    windowClasses:
      "rotate-[7deg] group-hover:-translate-y-3 group-hover:rotate-0 group-focus-within:-translate-y-3 group-focus-within:rotate-0",
  },
];

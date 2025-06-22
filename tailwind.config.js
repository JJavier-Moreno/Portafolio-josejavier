/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        background: "#0e1117", // fondo general
        header: "#12161f", // fondo más oscuro para header si quieres
        "border-default": "#2a2f3a", // borde claro estilo Supabase
        "verde-btn": {
          500: "#1f9b50", // botón base
          600: "#19874a", // hover
          700: "#136f3f", // active
        },
        gray: {
          50: "#f8f9fa", // casi blanco
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#adb5bd", // gris medio
          500: "#6c757d", // gris neutro
          600: "#495057", // gris oscuro
          700: "#343a40", // fondo principal
          800: "#212529", // fondo más oscuro
          900: "#16191d", // casi negro
        },
        black: {
          900: "#0e1117", // fondo principal (página)
          800: "#12161f", // fondo header o secciones internas
          700: "#1a1f27", // modales o bloques elevados
          600: "#2a2f3a", // bordes sutiles / separadores
        },
        negro: {
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e4e4e4",
          300: "#c6c6c6",
          400: "#8e8e8e",
          500: "#4f4f4f",
          600: "#3b3b3b",
          700: "#2e2e2e",
          800: "#1f1f1f",
          850: "#141414", // extra para fondo profundo
          900: "#0e0e0e",
          950: "#050505",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      keyframes: {
        marquee2: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee2: "marquee2 20s linear infinite",
      },
    },
  },
  plugins: [],
};

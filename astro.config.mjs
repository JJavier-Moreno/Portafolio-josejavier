// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  server: {
    host: true,           // escucha en 0.0.0.0
    port: 4321            // opcional: fija el puerto
  },
  vite: {
    resolve: {
      alias: {
        reactbits: fileURLToPath(new URL('./src/lib/reactbits', import.meta.url)),
      },
    },
    server: {
      // 👇 ESTA es la ubicación correcta
      allowedHosts: [
        'all',                         // para pruebas, o bien pon:
        // '09fef3f4alb7.ngrok-free.app'  // tu dominio ngrok exacto
      ],
      // (opcional) ayuda con el HMR detrás de HTTPS/ngrok:
      hmr: {
        host: '09fef3f4a1b7.ngrok-free.app', // tu dominio ngrok
        clientPort: 443,
        protocol: 'wss',
      },
    },
  },
});

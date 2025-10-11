// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        reactbits: fileURLToPath(new URL('./src/lib/reactbits', import.meta.url))
      }
    }
  }
});

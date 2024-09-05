import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { manifestForPlugIn } from "./manifest";


export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      ...manifestForPlugIn,  // Passando o manifest corretamente
      registerType: 'autoUpdate',  // Ou outro tipo de registro, como necessário
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,  // Ou você pode usar '0.0.0.0'
    port: 3000,  // Especifique uma porta se necessário
  },
});

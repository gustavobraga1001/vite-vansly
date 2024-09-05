import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { manifestForPlugIn } from "./manifest";


export default defineConfig({
  plugins: [
    react(),
    VitePWA(
      react(), VitePWA(manifestForPlugIn)
    ),
  ],
  server: {
    host: true,  // Ou você pode usar '0.0.0.0'
    port: 3000,  // Especifique uma porta se necessário
  },
});

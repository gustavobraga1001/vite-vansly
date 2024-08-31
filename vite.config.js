import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Ou você pode usar '0.0.0.0'
    port: 3000,  // Especifique uma porta se necessário
  },
});

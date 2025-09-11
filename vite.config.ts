import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { vips } from './vips.plugin';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vips(), svgr(), react()],
  base: process.env.APP_BASE_PATH,
  build: {
    outDir: process.env.APP_BUILD_DIR || 'dist',
  },
  preview: {
    port: Number(process.env.APP_PREVIEW_PORT) || 8080,
  },
  assetsInclude: ['**/*.ttf'],
  optimizeDeps: {
    exclude: ['wasm-vips'],
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Content-Security-Policy':
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net; object-src 'none'; base-uri 'self';",
    },
  },
});

import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePluginRadar as radar } from 'vite-plugin-radar';
import svgr from 'vite-plugin-svgr';
import { vips } from './vips.plugin';
import 'dotenv/config';

const metrica = ((id?: string) => {
  if (!id) {
    return;
  }
  return [
    {
      id,
      config: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      },
    },
  ];
})(process.env.VITE_METRIKA_ID);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vips(),
    svgr(),
    react(),
    ...(metrica
      ? [
          radar({
            enableDev: false,
            metrica,
          }),
        ]
      : []),
  ],
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
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
});

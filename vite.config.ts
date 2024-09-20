import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

console.log(process.env.VITE_BASE_URL)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()],
  base: process.env.APP_BASE_PATH || '/ArkhamDivider/',
  build: {
    outDir: process.env.APP_BUILD_DIR || 'dist'
  },
  preview: {
    port: Number(process.env.APP_PREVIEW_PORT) || 8080
  },
  assetsInclude: [
    '**/*.ttf'
  ]
})

import fs from 'node:fs';
import path from 'node:path';
import { Plugin } from 'vite';

const hashIgnoreFiles = [
  'vips-es6.js',
  'vips-heif.wasm',
  'vips-jxl.wasm',
  'vips-resvg.wasm',
  'vips.wasm',
];

export function vips(): Plugin {
  let outDir = '';

  return {
    name: 'vips',
    configResolved(config) {
      outDir = config.build.outDir;
      if (!config.inlineConfig.build?.ssr) {
        config.build.rollupOptions.output = {
          assetFileNames(chunkInfo) {
            if (
              chunkInfo.type === 'asset' &&
              chunkInfo.name &&
              hashIgnoreFiles.includes(chunkInfo.name)
            ) {
              return `assets/${chunkInfo.name}`;
            }
            return `assets/[name]-[hash].[ext]`;
          },
        };
      }

      if (!config.optimizeDeps.exclude) {
        config.optimizeDeps.exclude = ['wasm-vips'];
      } else {
        if (!config.optimizeDeps.exclude.includes('wasm-vips')) {
          config.optimizeDeps.exclude.push('wasm-vips');
        }
      }
    },
    closeBundle() {
      // Copy WASM files
      fs.copyFileSync(
        path.join(__dirname, 'node_modules/wasm-vips/lib/vips.wasm'),
        path.join(outDir, 'assets/vips.wasm')
      );
      fs.copyFileSync(
        path.join(__dirname, 'node_modules/wasm-vips/lib/vips-jxl.wasm'),
        path.join(outDir, 'assets/vips-jxl.wasm')
      );
      fs.copyFileSync(
        path.join(__dirname, 'node_modules/wasm-vips/lib/vips-heif.wasm'),
        path.join(outDir, 'assets/vips-heif.wasm')
      );
      fs.copyFileSync(
        path.join(__dirname, 'node_modules/wasm-vips/lib/vips-resvg.wasm'),
        path.join(outDir, 'assets/vips-resvg.wasm')
      );
      // Copy JS file (needed for wasm-vips to work)
      fs.copyFileSync(
        path.join(__dirname, 'node_modules/wasm-vips/lib/vips-es6.js'),
        path.join(outDir, 'assets/vips-es6.js')
      );
    },
  };
}

import { Plugin } from "vite";
import fs from "fs";
import path from "path";

const hashIgnoreFiles = [
  "vips-es6.js",
  "vips-heif.wasm",
  "vips-jxl.wasm",
  "vips-resvg.wasm",
  "vips.wasm",
];

export function vips(): Plugin {
  let outDir = "";

  return {
    name: "custom-headers",
    configResolved(config) {
      outDir = config.build.outDir;
      if (!config.inlineConfig.build?.ssr) {
        config.build.rollupOptions.output = {
          assetFileNames(chunkInfo) {
            if (
              chunkInfo.type === "asset" &&
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
        config.optimizeDeps.exclude = ["wasm-vips"];
      } else {
        if (!config.optimizeDeps.exclude.includes("wasm-vips")) {
          config.optimizeDeps.exclude.push("wasm-vips");
        }
      }
    },
    closeBundle() {
      fs.copyFileSync(
        path.join(__dirname, "node_modules/wasm-vips/lib/vips-jxl.wasm"),
        path.join(outDir, "assets/vips-jxl.wasm")
      );
      fs.copyFileSync(
        path.join(__dirname, "node_modules/wasm-vips/lib/vips-heif.wasm"),
        path.join(outDir, "assets/vips-heif.wasm")
      );
      fs.copyFileSync(
        path.join(__dirname, "node_modules/wasm-vips/lib/vips-resvg.wasm"),
        path.join(outDir, "assets/vips-resvg.wasm")
      );
    },
  };
}
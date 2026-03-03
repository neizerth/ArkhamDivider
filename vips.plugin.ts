import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const hashIgnoreFiles = [
	"vips-es6.js",
	"vips-heif.wasm",
	"vips-jxl.wasm",
	"vips-resvg.wasm",
	"vips.wasm",
];


const copyFile = (fileName: string, outDir: string) => {
	fs.copyFileSync(
		path.join(__dirname, `node_modules/wasm-vips/lib/${fileName}`),
		path.join(outDir, `assets/${fileName}`),
	);
};


export function vips(): Plugin {
	let outDir = "";

	return {
		name: "vips",
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
			// Copy WASM files to output directory
			for (const fileName of hashIgnoreFiles) {
				copyFile(fileName, outDir);
			}
		},
	};
}

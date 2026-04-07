import fs from "node:fs";
import path from "node:path";
import type { PreRenderedAsset } from "rollup";
import type { Plugin } from "vite";

const hashIgnoreFiles = [
	"vips-es6.js",
	"vips-heif.wasm",
	"vips-jxl.wasm",
	"vips-resvg.wasm",
	"vips.wasm",
];

function stableVipsAssetName(assetInfo: PreRenderedAsset): string | null {
	for (const fileName of hashIgnoreFiles) {
		const inOriginal = assetInfo.originalFileNames?.some(
			(p) =>
				p.endsWith(`/${fileName}`) ||
				p.endsWith(`\\${fileName}`) ||
				p.endsWith(fileName),
		);
		if (inOriginal || assetInfo.names?.includes(fileName)) {
			return fileName;
		}
		if (assetInfo.name === fileName) {
			return fileName;
		}
	}
	return null;
}

const copyFile = (fileName: string, outDir: string) => {
	fs.copyFileSync(
		path.join(__dirname, `node_modules/wasm-vips/lib/${fileName}`),
		path.join(outDir, `assets/${fileName}`),
	);
};

const stableWasmNames = new Set(
	hashIgnoreFiles.filter((f) => f.endsWith(".wasm")),
);

/** Rollup may still emit `vips-<hash>.wasm` while `locateFile` loads `vips.wasm` next to the chunk — remove the orphan. */
function pruneDuplicateVipsWasm(outDir: string) {
	const assetsDir = path.join(outDir, "assets");
	if (!fs.existsSync(assetsDir)) {
		return;
	}
	for (const f of fs.readdirSync(assetsDir)) {
		if (!f.startsWith("vips-") || !f.endsWith(".wasm")) {
			continue;
		}
		if (stableWasmNames.has(f)) {
			continue;
		}
		try {
			fs.unlinkSync(path.join(assetsDir, f));
		} catch {
			// ignore
		}
	}
}

export function vips(): Plugin {
	let outDir = "";

	return {
		name: "vips",
		configResolved(config) {
			outDir = config.build.outDir;
			if (!config.inlineConfig.build?.ssr) {
				const prev = config.build.rollupOptions.output;
				const prevOutput =
					prev && typeof prev === "object" && !Array.isArray(prev)
						? prev
						: {};
				const prevAssetFileNames = prevOutput.assetFileNames;

				config.build.rollupOptions.output = {
					...prevOutput,
					assetFileNames(assetInfo) {
						if (assetInfo.type === "asset") {
							const stable = stableVipsAssetName(assetInfo);
							if (stable) {
								return `assets/${stable}`;
							}
						}
						if (typeof prevAssetFileNames === "function") {
							return prevAssetFileNames(assetInfo);
						}
						if (typeof prevAssetFileNames === "string") {
							return prevAssetFileNames;
						}
						return "assets/[name]-[hash].[ext]";
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
			pruneDuplicateVipsWasm(outDir);
		},
	};
}

import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { VitePluginRadar } from "vite-plugin-radar";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { vips } from "./vips.plugin";

dotenv.config({
	path: [".env", ".env.local"],
});

export default defineConfig(({ mode }) => ({
	worker: {
		format: "es",
	},
	plugins: [
		vips(),
		tsconfigPaths(),
		VitePluginRadar({
			enableDev: false,
			gtm: (process.env.VITE_GTM_ID)
				? [
						{
							id: process.env.VITE_GTM_ID,
						},
					]
				: [],
			metrica: process.env.VITE_METRIKA_ID
				? [
						{
							id: process.env.VITE_METRIKA_ID,
							config: {
								defer: true,
								clickmap: true,
								trackLinks: true,
								accurateTrackBounce: true,
								webvisor: true,
								trackHash: true,
							},
						},
					]
				: [],
		}),
		react({
			// Enable Fast Refresh for better HMR support
			// Default is already on; set explicitly for reliability
			jsxRuntime: "automatic",
		}),
		mkcert(),
		svgr(),
		...(mode === "analyze"
			? [
					visualizer({
						filename: "dist/stats.html",
						gzipSize: true,
						brotliSize: true,
						open: true,
					}),
				]
			: []),
	],
	server: {
		hmr: {
			// Improve HMR for React components
			overlay: true,
			// Optional: set HMR port explicitly
			// clientPort: 5173,
		},
		// Disable full reload on errors; use HMR only
		watch: {
			// Ignore changes in node_modules and other unnecessary paths
			ignored: ["**/node_modules/**", "**/.git/**"],
		},
		headers: {
			// Full isolation for SharedArrayBuffer / wasm-vips pthreads.
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cross-Origin-Opener-Policy": "same-origin",
		},
	},
	// Optimize deps for better HMR
	optimizeDeps: {
		// Pre-bundle these for faster HMR
		include: ["react", "react-dom", "react-router"],
		exclude: ["wasm-vips"],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes("node_modules")) {
						return;
					}
					// Keep node_modules in a single vendor chunk to avoid
					// circular chunk dependencies (e.g. react-vendor <-> mui-vendor)
					// that can happen with fine-grained manual chunking.
					return "vendor";
				},
			},
		},
	},
	assetsInclude: ["**/*.ttf"],
}));

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import { vips } from "./vips.plugin";

export default defineConfig({
	worker: {
		format: "es",
	},
	plugins: [
		vips(),
		tsconfigPaths(),
		react({
			// Enable Fast Refresh for better HMR support
			// Default is already on; set explicitly for reliability
			jsxRuntime: "automatic",
		}),
		mkcert(),
		svgr(),
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
			"Cross-Origin-Embedder-Policy": "require-corp",
			"Cross-Origin-Opener-Policy": "same-origin",
		},
		proxy: {
			"/arkham-icons": {
				target: "https://neizerth.github.io/ArkhamDividerData/fonts",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/arkham-icons/, ""),
				// Force-add CORP header for Safari on the fly
				configure: (proxy) => {
					proxy.on("proxyRes", (proxyRes) => {
						proxyRes.headers["Cross-Origin-Resource-Policy"] = "cross-origin";
					});
				},
			},
		},
	},
	// Optimize deps for better HMR
	optimizeDeps: {
		// Pre-bundle these for faster HMR
		include: ["react", "react-dom", "react-router"],
		exclude: ["wasm-vips"],
	},
	assetsInclude: ["**/*.ttf"],
});

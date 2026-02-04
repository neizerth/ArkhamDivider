import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { vips } from "./vips.plugin";

export default defineConfig({
	worker: {
		format: "es",
	},
	plugins: [
		vips(),
		tsconfigPaths(),
		react({
			// Включаем Fast Refresh для лучшей поддержки HMR
			// По умолчанию уже включен, но явно указываем для надежности
			jsxRuntime: "automatic",
		}),
		svgr(),
	],
	server: {
		hmr: {
			// Улучшаем HMR для лучшей работы с React компонентами
			overlay: true,
			// Явно указываем порт для HMR (если нужно)
			// clientPort: 5173,
		},
		// Отключаем полную перезагрузку при ошибках, используем только HMR
		watch: {
			// Игнорируем изменения в node_modules и других ненужных файлах
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
	// Оптимизация для лучшей работы HMR
	optimizeDeps: {
		// Включаем предварительную оптимизацию для лучшей работы HMR
		include: ["react", "react-dom", "react-router"],
		exclude: ["wasm-vips"],
	},
	assetsInclude: ["**/*.ttf"],
});

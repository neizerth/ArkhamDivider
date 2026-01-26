import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
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
	},
	// Оптимизация для лучшей работы HMR
	optimizeDeps: {
		// Включаем предварительную оптимизацию для лучшей работы HMR
		include: ["react", "react-dom", "react-router"],
	},
});

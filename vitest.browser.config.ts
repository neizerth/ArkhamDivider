import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
	plugins: [tsconfigPaths()],
	publicDir: "public",
	test: {
		include: ["slices/**/__tests__/*.browser.test.ts"],
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [{ browser: "chromium" }],
		},
	},
});

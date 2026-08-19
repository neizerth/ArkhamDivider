import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/modules/core/app/app/ui";
import { reloadForStaleChunk } from "@/shared/lib";
import "@/shared/fonts";
import "@/shared/style/style.css";

/**
 * Vite fires this when a `<link rel="modulepreload">` fails — a chunk that vanished in a
 * deploy while this tab was open. It happens outside any dynamic `import()` we control, so
 * `lazyWithReload` never sees it.
 */
window.addEventListener("vite:preloadError", (event) => {
	// Suppress Vite's default rethrow: the reload below is the recovery.
	event.preventDefault();
	reloadForStaleChunk();
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

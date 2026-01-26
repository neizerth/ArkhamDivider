import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/modules/core/app/app/ui";
import "@/shared/fonts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/modules/core/app/app/ui";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

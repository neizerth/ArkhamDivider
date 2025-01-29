import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/app/App.tsx";
import { StoreProvider } from "@/app/providers/StoreProvider.tsx";
import { I18nextProvider } from "react-i18next";
import { IconFontStyles } from "./components";
import i18n from "./shared/config/i18n.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<StoreProvider>
			<I18nextProvider i18n={i18n}>
				<IconFontStyles />
				<App />
			</I18nextProvider>
		</StoreProvider>
	</StrictMode>,
);

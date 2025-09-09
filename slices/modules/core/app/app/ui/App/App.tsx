import { I18NProvider } from "@/modules/core/i18n/app/ui/I18NProvider";
import { RouterProvider } from "@/modules/core/router/app/ui";
import { AppLoadProvider, MUIProvider, StoreProvider } from "../providers";

export function App() {
	return (
		<StoreProvider>
			<I18NProvider>
				<MUIProvider>
					<AppLoadProvider>
						<RouterProvider />
					</AppLoadProvider>
				</MUIProvider>
			</I18NProvider>
		</StoreProvider>
	);
}

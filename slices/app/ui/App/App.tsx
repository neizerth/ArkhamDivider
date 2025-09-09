import { I18NProvider } from "@/modules/core/i18n/app/ui/I18NProvider";
import { RouterProvider } from "@/modules/core/router/app/ui";
import { MUIProvider, StoreProvider } from "../providers";

export function App() {
	return (
		<StoreProvider>
			<I18NProvider>
				<MUIProvider>
					<RouterProvider />
				</MUIProvider>
			</I18NProvider>
		</StoreProvider>
	);
}

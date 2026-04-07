import { I18NProvider } from "@/modules/core/i18n/app/ui/I18NProvider";
import { IconSelectionProvider } from "@/modules/core/icon/app/ui";
import { RouterProvider } from "@/modules/core/router/app/ui";
import { DividerProvider } from "@/modules/divider/app/ui/DividerProvider";
import { AppLoadProvider, MUIProvider, StoreProvider } from "../providers";

export function App() {
	return (
		<StoreProvider>
			<I18NProvider>
				<MUIProvider>
					<AppLoadProvider>
						<IconSelectionProvider>
							<DividerProvider>
								<RouterProvider />
							</DividerProvider>
						</IconSelectionProvider>
					</AppLoadProvider>
				</MUIProvider>
			</I18NProvider>
		</StoreProvider>
	);
}

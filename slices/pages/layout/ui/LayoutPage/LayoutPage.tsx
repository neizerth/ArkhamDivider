import { AppLoader } from "@/modules/core/app/shared/ui";
import {
	selectCategory,
	selectLayout,
	useRouterLayout,
} from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import { LayoutNotFound } from "../LayoutNotFound";
import { LayoutPageContent } from "../LayoutPageContent";

export function LayoutPage() {
	// The route is the source of truth here: the store is only filled a tick later by
	// `setDividerLayoutOnRouteChangeSaga`, so judging by the store alone flashes
	// `LayoutNotFound` on every navigation.
	const routerLayout = useRouterLayout();
	const layout = useAppSelector(selectLayout);
	const category = useAppSelector(selectCategory);

	if (!routerLayout) {
		return <LayoutNotFound />;
	}

	const synced = layout?.id === routerLayout.layout.id;

	if (!synced || !layout || !category) {
		return <AppLoader />;
	}

	return <LayoutPageContent layout={layout} category={category} />;
}

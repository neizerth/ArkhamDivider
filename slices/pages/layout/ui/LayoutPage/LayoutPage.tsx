import { selectLayout } from "@/modules/divider/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { LayoutNotFound } from "../LayoutNotFound";
import { LayoutPageContent } from "../LayoutPageContent";

export function LayoutPage() {
	const layout = useAppSelector(selectLayout);

	if (!layout) {
		return <LayoutNotFound />;
	}

	return <LayoutPageContent layout={layout} />;
}

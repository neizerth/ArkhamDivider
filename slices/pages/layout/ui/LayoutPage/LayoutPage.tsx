import { selectCategory, selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import { LayoutNotFound } from "../LayoutNotFound";
import { LayoutPageContent } from "../LayoutPageContent";

export function LayoutPage() {
	const layout = useAppSelector(selectLayout);
	const category = useAppSelector(selectCategory);

	if (!layout || !category) {
		return <LayoutNotFound />;
	}

	return <LayoutPageContent layout={layout} category={category} />;
}

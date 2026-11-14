import { selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import { selectDividerParam } from "../store";

export const useTabsCount = (dividerId: string) => {
	const tabsCount = useAppSelector(
		selectDividerParam<number>({
			id: dividerId,
			key: "tabsCount",
		}),
	);

	const layout = useAppSelector(selectLayout);

	if (!layout || !layout.tabs) {
		return;
	}

	const { tabs } = layout;

	if (tabs.type === "variable") {
		return tabsCount ?? tabs.initial;
	}

	return tabs.value;
};

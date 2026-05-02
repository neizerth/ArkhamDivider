import type { VintageDividerLayout } from "../../model";

export function getVintageDividerTabsCount(layout: VintageDividerLayout) {
	if (!layout.tabs) {
		return 3;
	}
	if (layout.tabs.type === "fixed") {
		return layout.tabs.value;
	}
	return 3;
}

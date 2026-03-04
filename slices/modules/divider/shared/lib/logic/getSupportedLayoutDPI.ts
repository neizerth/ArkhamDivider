import type { DPI } from "@/modules/print/shared/model";
import { browser } from "@/shared/config";
import type { DividerLayout } from "../../model";

export const getSupportedLayoutDPI = (layout?: DividerLayout | null): DPI[] => {
	const isMobileSafari = browser?.os === "iOS" && browser.name === "safari";

	if (!layout?.printSize) {
		return [300];
	}
	return Object.keys(layout.printSize)
		.filter((value) => {
			const dpi = Number(value) as DPI;
			if (isMobileSafari && dpi > 600) {
				return false;
			}
			return true;
		})
		.map(Number) as DPI[];
};

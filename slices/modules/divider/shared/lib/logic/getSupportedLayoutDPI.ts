import type { DPI } from "@/modules/print/shared/model";
import type { DividerLayout } from "../../model";

export const getSupportedLayoutDPI = (layout?: DividerLayout | null): DPI[] => {
	if (!layout?.printSize) {
		return [300];
	}
	return Object.keys(layout.printSize).map(Number) as DPI[];
};

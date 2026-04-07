import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { Chapter2DividerProps } from "../model/chapter2";

export const getChapter2DividerDefaultIcon = (
	divider: Chapter2DividerProps,
) => {
	if (divider.layoutType === "scenario") {
		return divider.icon;
	}
	return getFactionIcon(divider.faction);
};

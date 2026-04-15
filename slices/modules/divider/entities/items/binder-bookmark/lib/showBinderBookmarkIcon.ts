import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDividerFaction } from "@/modules/divider/shared/lib";
import type { BinderBookmarkProps } from "../model";

type Options = {
	divider: BinderBookmarkProps;
};
export const showBinderBookmarkIcon = (options: Options) => {
	const { divider } = options;
	const faction = getDividerFaction(divider) ?? "neutral";

	const icon = getDividerIcon({ divider, param: "icon", defaultIcon: faction });

	if (icon === faction && faction !== "multiclass") {
		return false;
	}

	return true;
};

import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDividerFaction } from "@/modules/divider/shared/lib";
import type { BinderBookmarkProps } from "../model";
import { getBinderBookmarkDefaultIcon } from "./getBinderBookmarkDefaultIcon";

export const showBinderBookmarkIcon = (divider: BinderBookmarkProps) => {
	const faction = getDividerFaction(divider) ?? "neutral";
	const defaultIcon = getBinderBookmarkDefaultIcon(divider);

	const icon = getDividerIcon({ divider, param: "icon", defaultIcon: faction });

	if (icon && icon !== defaultIcon) {
		return true;
	}

	if (icon === faction && faction !== "multiclass") {
		return false;
	}

	return true;
};

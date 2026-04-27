import { isEmptyIcon } from "@/modules/core/icon/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { ArkhamIndexDividerProps } from "../../../model";

export function showArkhamIndexDividerTabIcon(
	divider: ArkhamIndexDividerProps,
) {
	const icon = getDividerIcon({
		divider,
		param: "icon",
		defaultIcon: divider.icon,
	});
	const isEmpty = isEmptyIcon(icon);

	if (divider.layoutType === "scenario") {
		return !isEmpty;
	}

	const factionIcon = getFactionIcon(divider.faction);

	const isFactionIcon = icon === factionIcon;

	if (!isFactionIcon || ["neutral", "multiclass"].includes(divider.faction)) {
		return !isEmpty;
	}

	return false;
}

import { getDividerIcon } from "@/modules/divider/features/lib";
import type { CarlosLemosDividerParams } from "../model";

export const getCarlosLemosEncounterIcons = (
	divider: CarlosLemosDividerParams,
) => {
	const encounterIcons = divider.params?.encounterIcons;
	const icon = getDividerIcon({
		divider,
		param: "icon",
		defaultIcon: divider.icon,
	});

	const icons = encounterIcons ?? [];

	if ((!encounterIcons || icons.length === 0) && icon) {
		return [icon];
	}

	return icons;
};

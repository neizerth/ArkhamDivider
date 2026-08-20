import type { Icon } from "@/modules/core/icon/shared/model";
import { carlosLemosObjects as O } from "../config/objects";
import type { CarlosLemosDividerParams } from "../model";
import { getCarlosLemosEncounterIcons } from "./getCarlosLemosEncounterIcons";

type Position = {
	icon: Icon;
	top: number;
	left: number;
};

type Options = {
	divider: CarlosLemosDividerParams;
	dividerWidth: number;
};

export const getCarlsoLemosEncounterIconPositions = ({
	divider,
	dividerWidth,
}: Options): Position[] => {
	const encounterIcons = getCarlosLemosEncounterIcons(divider);
	const { encounters, encounterIcon } = O;
	const cellSize = encounters.height;
	const areaWidth = dividerWidth - encounters.left - encounters.right;
	const areaCenter = (areaWidth - encounterIcons.length * cellSize) / 2;
	const areaLeft = encounters.left + areaCenter;

	return encounterIcons.map((icon, index) => ({
		icon,
		top: encounters.top + encounterIcon.top,
		left: areaLeft + index * cellSize + encounterIcon.left,
	}));
};

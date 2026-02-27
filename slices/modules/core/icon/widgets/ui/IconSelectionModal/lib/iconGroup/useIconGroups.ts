import { useMemo } from "react";
import { selectIcons } from "@/modules/core/icon/shared/lib";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectStories } from "@/modules/story/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getIconGroups } from "./getIconGroups";

export const useIconGroups = () => {
	const iconMapping = useAppSelector(selectIcons);
	const encounterSets = useAppSelector(selectEncounterSets);
	const stories = useAppSelector(selectStories);

	return useMemo(() => {
		const icons = Object.values(iconMapping);

		return getIconGroups({
			icons,
			encounterSets,
			stories,
		});
	}, [iconMapping, encounterSets, stories]);
};

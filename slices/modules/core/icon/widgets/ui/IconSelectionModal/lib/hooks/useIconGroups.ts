import { useMemo } from "react";
import { selectIcons } from "@/modules/core/icon/shared/lib";
import type { IconSelectionMode } from "@/modules/core/icon/shared/model";
import { selectEncounterSets } from "@/modules/encounterSet/shared/lib";
import { selectStories } from "@/modules/story/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getIconGroups } from "../logic/getIconGroups";

type Options = {
	mode: IconSelectionMode;
};

export const useIconGroups = ({ mode }: Options) => {
	const iconMapping = useAppSelector(selectIcons);
	const encounterSets = useAppSelector(selectEncounterSets);
	const stories = useAppSelector(selectStories);

	return useMemo(() => {
		const icons = Object.values(iconMapping);

		return getIconGroups({
			icons,
			encounterSets,
			stories,
			mode,
		});
	}, [iconMapping, encounterSets, stories, mode]);
};

import type { IEncounterSet, IIcon, IStory } from "@/shared/model/types/api";
import type { IIconMainGroup } from "@/shared/model/types/icons";
import { getGameIconGroups } from "./getGameIconGroups";
import { getStoriesIconGroups } from "./getStoriesIconGroups";

export type IGetIconGroupsOptions = {
	icons: IIcon[];
	encounterSets: IEncounterSet[];
	stories: IStory[];
};

export const getIconGroups = (
	options: IGetIconGroupsOptions,
): IIconMainGroup[] => {
	return [...getGameIconGroups(options), ...getStoriesIconGroups(options)];
};

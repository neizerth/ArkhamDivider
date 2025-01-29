import { IEncounterSet, IIcon, IStory } from "@/shared/model/types/api";
import { getStoriesIconGroups } from "./getStoriesIconGroups";
import { getGameIconGroups } from "./getGameIconGroups";
import { IIconMainGroup } from "@/shared/model/types/icons";

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

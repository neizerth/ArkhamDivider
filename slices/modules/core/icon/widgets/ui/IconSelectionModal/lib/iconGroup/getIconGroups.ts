import type { Icon } from "@/modules/core/icon/shared/model";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type { Story } from "@/modules/story/shared/model";
import { getGameIconGroups } from "./getGameIconGroups";
import { getStoriesIconGroups } from "./getStoriesIconGroups";

type Options = {
	icons: Icon[];
	encounterSets: EncounterSet[];
	stories: Story[];
};

export const getIconGroups = (options: Options) => {
	return [...getGameIconGroups(options), ...getStoriesIconGroups(options)];
};

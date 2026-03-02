import type { ArkhamDividerIcon } from "@/modules/core/icon/shared/model";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type { Story } from "@/modules/story/shared/model";
import { getGameIconGroups } from "./getGameIconGroups";
import { getStoriesIconGroups } from "./getStoriesIconGroups";

type Options = {
	icons: ArkhamDividerIcon[];
	encounterSets: EncounterSet[];
	stories: Story[];
};

export const getIconGroups = (options: Options) => {
	return [...getGameIconGroups(options), ...getStoriesIconGroups(options)];
};

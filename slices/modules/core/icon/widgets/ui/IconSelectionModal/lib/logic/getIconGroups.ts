import type {
	ArkhamDividerIcon,
	IconSelectionMode,
} from "@/modules/core/icon/shared/model";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import type { Story } from "@/modules/story/shared/model";
import { getGameIconGroups } from "./getGameIconGroups";
import { getStoriesIconGroups } from "./getStoriesIconGroups";

type Options = {
	icons: ArkhamDividerIcon[];
	encounterSets: EncounterSet[];
	mode: IconSelectionMode;
	stories: Story[];
	iconSet?: string;
};

export const getIconGroups = (options: Options) => {
	return [...getGameIconGroups(options), ...getStoriesIconGroups(options)];
};

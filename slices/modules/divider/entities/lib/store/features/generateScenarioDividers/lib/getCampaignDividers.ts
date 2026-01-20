import { v4 } from "uuid";
import type {
	Divider,
	DividerCategory,
	DividerLayout,
} from "@/modules/divider/shared/model";
import { getEncounterSetCardsCount } from "@/modules/encounterSet/shared/lib/logic";
import type { StoryWithRelations } from "@/modules/story/shared/model";

type Options = {
	story: StoryWithRelations;
	layout: DividerLayout;
	category: DividerCategory;
	includeReturnStory: boolean;
};

const storyToDivider = ({
	story,
	layout,
	category,
}: Omit<Options, "includeReturnStory">): Divider => {
	const cardsCount = story.encounterSets.reduce((acc, encounterSet) => {
		const count = getEncounterSetCardsCount({ encounterSet }) ?? 0;
		return acc + count;
	}, 0);

	return {
		id: v4(),
		type: "scenario",
		side: "front",
		story,
		layout,
		category,
		title: story.name,
		icon: story.icon,
		cardsCount,
	};
};

export const getCampaignDividers = (options: Options): Divider[] => {
	const { includeReturnStory } = options;
	const { returnStory } = options.story;

	const storyDivider = storyToDivider(options);

	if (!includeReturnStory || !returnStory) {
		return [storyDivider];
	}

	const returnStoryDivider = storyToDivider({ ...options, story: returnStory });

	return [storyDivider, returnStoryDivider];
};

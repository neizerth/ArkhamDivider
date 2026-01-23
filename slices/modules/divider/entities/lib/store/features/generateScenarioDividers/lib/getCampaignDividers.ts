import { v4 } from "uuid";
import type { Divider } from "@/modules/divider/shared/model";
import { getEncounterSetCardsCount } from "@/modules/encounterSet/shared/lib/logic";
import type { StoryWithRelations } from "@/modules/story/shared/model";

type Options = {
	story: StoryWithRelations;
	includeReturnStory: boolean;
};

const storyToDivider = (story: StoryWithRelations): Divider => {
	const cardsCount = story.encounterSets.reduce((acc, encounterSet) => {
		const count = getEncounterSetCardsCount({ encounterSet }) ?? 0;
		return acc + count;
	}, 0);

	return {
		id: v4(),
		type: "scenario",
		side: "front",
		storyCode: story.code,
		title: story.name,
		icon: story.icon,
		cardsCount,
	};
};

export const getCampaignDividers = (options: Options): Divider[] => {
	const { includeReturnStory, story } = options;
	const { returnStory } = options.story;

	const storyDivider = storyToDivider(story);

	if (!includeReturnStory || !returnStory) {
		return [storyDivider];
	}

	const returnStoryDivider = storyToDivider(returnStory);

	return [storyDivider, returnStoryDivider];
};

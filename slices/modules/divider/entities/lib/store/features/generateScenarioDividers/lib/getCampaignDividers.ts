import { v4 } from "uuid";
import type { Divider } from "@/modules/divider/shared/model";
import { getCampaignCards } from "@/modules/story/entities/lib";
import type { StoryWithRelations } from "@/modules/story/shared/model";

type Options = {
	story: StoryWithRelations;
	includeReturnStory: boolean;
};

const storyToDivider = (story: StoryWithRelations): Divider => {
	const cards = getCampaignCards(story);
	const cardsCount = cards.reduce((acc, { size }) => acc + size, 0);

	const { icon } = story;

	return {
		id: v4(),
		type: "campaign",
		layoutType: "scenario",
		side: "front",
		storyCode: story.code,
		title: story.name,
		icon,
		cards,
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

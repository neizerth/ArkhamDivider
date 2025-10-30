import { anyPass, ascend, complement, descend, prop, sortWith } from "ramda";
import { compact } from "ramda-adjunct";
import { useCallback, useMemo } from "react";
import {
	isChallengeStory,
	isMainCampaign,
	isReturnPack,
	isSideContent,
	useStoryTranslation,
} from "@/modules/story/shared/lib";
import type { Story } from "../../../../model";

const restFilter = complement(
	anyPass([isMainCampaign, isSideContent, isChallengeStory, isReturnPack]),
);

export const useStoryGroups = (stories: Story[]) => {
	const { t, translateStory } = useStoryTranslation();

	const data = useMemo(() => {
		return sortWith(
			[
				ascend(({ position }) => position || Infinity),
				descend(({ is_official }) => Boolean(is_official)),
				ascend(prop("name")),
			],
			stories,
		);
	}, [stories]);

	const mapStory = useCallback(
		(story: Story) => {
			const name = translateStory(story.name, story);
			const translated = story.name !== name;

			return {
				...story,
				translated,
				name: t(story.name),
			};
		},
		[translateStory, t],
	);

	const getStories = useCallback(
		(filter: (story: Story) => boolean) => {
			const stories = data.filter(filter).map(mapStory);

			return sortWith([descend(prop("translated"))], stories);
		},
		[data, mapStory],
	);

	return useMemo(() => {
		const campaigns = getStories(isMainCampaign);
		const sideScenarios = getStories(isSideContent);
		const challenges = getStories(isChallengeStory);
		const returnCampaigns = getStories(isReturnPack);

		const rest = getStories(restFilter);

		return compact([
			{
				id: "campaigns",
				label: "Campaigns",
				stories: campaigns,
			},
			{
				id: "return-packs",
				label: "Return Packs",
				stories: returnCampaigns,
			},
			{
				id: "side-scenarios",
				label: "Side Scenarios",
				stories: sideScenarios,
			},
			{
				id: "challenge-scenarios",
				label: "Challenge Scenarios",
				stories: challenges,
			},
			rest.length > 0 && {
				id: "other",
				label: "Other",
				stories: rest,
			},
		]);
	}, [getStories]);
};

import { anyPass, ascend, complement, descend, prop, sortWith } from "ramda";
import { useCallback, useMemo } from "react";
import { DEFAULT_LANGUAGE } from "@/modules/core/i18n/shared/config";
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

export const useStoryData = (stories: Story[]) => {
	const { t, translateStory, i18n } = useStoryTranslation();
	const { language } = i18n;
	const isDefaultLanguage = language === DEFAULT_LANGUAGE;

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
		(group: string) => (story: Story) => {
			const name = translateStory(story.name, story);
			console.log(story.name, name);
			const translated = isDefaultLanguage || story.name !== name;

			return {
				...story,
				translated,
				name: t(story.name),
				group: t(group),
			};
		},
		[translateStory, t, isDefaultLanguage],
	);

	const getStories = useCallback(
		(group: string, filter: (story: Story) => boolean) => {
			const stories = data.filter(filter).map(mapStory(group));

			return sortWith([descend(prop("translated"))], stories);
		},
		[data, mapStory],
	);

	return useMemo(() => {
		const campaigns = getStories("Campaigns", isMainCampaign);
		const sideScenarios = getStories("Side Scenarios", isSideContent);
		const challenges = getStories("Challenge Scenarios", isChallengeStory);
		const returnCampaigns = getStories("Return Packs", isReturnPack);

		const rest = getStories("Other", restFilter);

		return [
			...campaigns,
			...sideScenarios,
			...challenges,
			...returnCampaigns,
			...rest,
		];
	}, [getStories]);
};

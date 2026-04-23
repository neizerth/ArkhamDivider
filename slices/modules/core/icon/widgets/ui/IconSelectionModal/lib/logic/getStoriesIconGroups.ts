import { propEq } from "ramda";
import type { ArkhamDividerIcon } from "@/modules/core/icon/shared/model";
import type { EncounterSet } from "@/modules/encounterSet/shared/model";
import {
	isChallengeStory,
	isCoreSet,
	isInvestigatorStory,
	isMainCampaign,
	isSideCampaign,
	isSideContent,
} from "@/modules/story/shared/lib";
import type { Story } from "@/modules/story/shared/model";
import type { IconGroup } from "../../model";
import { getStoryIconSubgroup } from "./getStoryIconSubgroup";

type Options = {
	icons: ArkhamDividerIcon[];
	encounterSets: EncounterSet[];
	stories: Story[];
};

export const getStoriesIconGroups = ({
	stories,
	icons,
	encounterSets,
}: Options): IconGroup[] => {
	const toIcon = (name: string) => {
		const icon = encounterSets.find(propEq(name, "code"))?.icon;

		if (icon) {
			return icon;
		}

		return icons.find(propEq(name, "icon"))?.icon;
	};
	const campaignGroups = stories.filter(
		(story) =>
			(isMainCampaign(story) || isSideCampaign(story) || isCoreSet(story)) &&
			!isInvestigatorStory(story),
	);
	const sideGroups = stories.filter(isSideContent);
	const challengeGroups = stories.filter(isChallengeStory);

	const toIconGroup = getStoryIconSubgroup(toIcon);

	const mapStory = (story: Story) => {
		const subGroup = toIconGroup(story);
		// NOTE: We intentionally avoid expanding campaign icons by `iconSet`.
		// Some icon sets include multiple custom campaigns; expanding would mix them.
		return subGroup;
	};

	return [
		{
			id: "campaigns",
			name: "Campaigns",
			groups: campaignGroups.map(mapStory),
		},
		{
			id: "side",
			name: "Side Scenarios",
			groups: sideGroups.map(mapStory),
		},
		{
			id: "challenges",
			name: "Challenge Scenarios",
			groups: challengeGroups.map(mapStory),
		},
	];
};

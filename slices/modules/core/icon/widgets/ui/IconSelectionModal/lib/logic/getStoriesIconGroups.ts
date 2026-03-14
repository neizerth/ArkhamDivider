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

	return [
		{
			id: "campaigns",
			name: "Campaigns",
			groups: campaignGroups.map(toIconGroup),
		},
		{
			id: "side",
			name: "Side Scenarios",
			groups: sideGroups.map(toIconGroup),
		},
		{
			id: "challenges",
			name: "Challenge Scenarios",
			groups: challengeGroups.map(toIconGroup),
		},
	];
};

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
import { icoMoonSetId } from "../../config";
import type { IconGroup } from "../../model";
import { getStoryIconSubgroup } from "./getStoryIconSubgroup";

type Options = {
	icons: ArkhamDividerIcon[];
	encounterSets: EncounterSet[];
	stories: Story[];
	iconSet?: string;
};

export const getStoriesIconGroups = ({
	stories,
	icons,
	encounterSets,
	iconSet,
}: Options): IconGroup[] => {
	const iconsBySet = iconSet
		? icons.filter((i) => i.iconSet === iconSet)
		: icons;

	const toIcon = (name: string) => {
		const icon = encounterSets.find((s) => s.code === name)?.icon;

		if (icon) {
			return icon;
		}

		// `icons` can contain multiple entries with the same `icon` name across icon sets.
		// Prefer the currently selected icon set to keep search results and groups consistent.
		return (
			iconsBySet.find((i) => i.icon === name)?.icon ??
			icons.find((i) => i.icon === name)?.icon
		);
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
		const subgroupIcons = subGroup.icons.filter((id) => {
			const icon = icons.find(propEq(id, "icon"));

			return icon?.iconSet !== icoMoonSetId;
		});

		//
		// NOTE: We intentionally avoid expanding campaign icons by `iconSet`.
		// Some icon sets include multiple custom campaigns; expanding would mix them.
		return {
			...subGroup,
			icons: subgroupIcons,
		};
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

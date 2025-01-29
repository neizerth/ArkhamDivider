import {
	isChallenge,
	isMainCampaign,
	isSideCampaign,
	isSideContent,
} from "@/shared/lib/store/features/stories/criteria";
import type { IStory } from "@/shared/model/types/api";
import { isNotNil, prop, propEq, uniq } from "ramda";
import type { IGetIconGroupsOptions } from "./getIconGroups";

export const getStoriesIconGroups = ({
	stories,
	icons,
	encounterSets,
}: IGetIconGroupsOptions) => {
	const toIcon = (name: string) => {
		const icon = encounterSets.find(propEq(name, "code"))?.icon;

		if (icon) {
			return icon;
		}

		return icons.find(propEq(name, "icon"))?.icon;
	};
	const campaignGroups = stories.filter(
		(story) => isMainCampaign(story) || isSideCampaign(story),
	);
	const sideGroups = stories.filter(isSideContent);
	const challengeGroups = stories.filter(isChallenge);

	const toIconGroup = getStoryIconGroup(toIcon);

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

const getStoryIconGroup =
	(toIcon: (name: string) => string | undefined) =>
	({
		encounter_sets,
		name,
		icon,
		code,
		pack_codes = [],
		pack_code,
		campaigns = [],
	}: IStory) => {
		const campaignIcons = campaigns
			.map(prop("icon"))
			.concat([code, pack_code, ...pack_codes])
			.filter(isNotNil)
			.map(toIcon)
			.filter(isNotNil);

		const icons = [
			icon,
			...campaignIcons,
			...encounter_sets.map(toIcon),
		].filter(isNotNil);

		return {
			id: code,
			name,
			icons: uniq(icons),
		};
	};

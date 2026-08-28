import { ascend, descend, prop, propEq, sortWith, uniq } from "ramda";
import { getIconSetIcons } from "@/modules/core/icon/shared/lib";
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
	stories: unsortedStories,
	icons,
	encounterSets,
	iconSet,
}: Options): IconGroup[] => {
	const stories = sortWith(
		[
			ascend(({ position }) => position || Infinity),
			descend(({ is_official }) => Boolean(is_official)),
			ascend(prop("name")),
		],
		unsortedStories,
	);

	const iconsBySet = iconSet
		? icons.filter((icon) => icon.iconSet === iconSet)
		: icons;

	const uniqueCycles = uniqueStoryCycles(stories);
	const uniqueIconSets = uniqueCampaignIconSets(stories, icons);
	const toIcon = (name?: string) => {
		if (!name) {
			return;
		}

		return (
			icons.find((icon) => icon.encounter_set_code === name)?.icon ??
			encounterSets.find((set) => set.code === name)?.icon ??
			iconsBySet.find((icon) => icon.icon === name)?.icon ??
			icons.find((icon) => icon.icon === name)?.icon
		);
	};
	const toIconGroup = getStoryIconSubgroup(toIcon);

	const mapStory = (story: Story) => {
		const subGroup = toIconGroup(story);
		const packs = storyPacks(story);
		const byMeta = icons
			.filter((icon) => belongsToStory(icon, story, packs, uniqueCycles))
			.map(prop("icon"));
		const campaignSet = getCampaignIconSet(story, icons);
		const byIconSet =
			campaignSet &&
			campaignSet !== icoMoonSetId &&
			uniqueIconSets.has(campaignSet)
				? getIconSetIcons({ icons, iconSet: campaignSet })
				: [];

		return {
			...subGroup,
			icons: uniq([...subGroup.icons, ...byMeta, ...byIconSet]).filter(
				(id) => icons.find(propEq(id, "icon"))?.iconSet !== icoMoonSetId,
			),
		};
	};

	return [
		{
			id: "campaigns",
			name: "Campaigns",
			groups: stories
				.filter(
					(story) =>
						(isMainCampaign(story) ||
							isSideCampaign(story) ||
							isCoreSet(story)) &&
						!isInvestigatorStory(story),
				)
				.map(mapStory),
		},
		{
			id: "side",
			name: "Side Scenarios",
			groups: stories.filter(isSideContent).map(mapStory),
		},
		{
			id: "challenges",
			name: "Challenge Scenarios",
			groups: stories.filter(isChallengeStory).map(mapStory),
		},
	];
};

const getCampaignIconSet = (story: Story, icons: ArkhamDividerIcon[]) => {
	const names = [
		story.icon,
		story.campaign_id,
		story.pack_code,
		...(story.pack_codes ?? []),
		story.code,
	].filter((value): value is string => Boolean(value));

	for (const name of names) {
		const iconSet = icons.find((icon) => icon.icon === name)?.iconSet;
		if (iconSet) {
			return iconSet;
		}
	}
};

const uniqueCampaignIconSets = (
	stories: Story[],
	icons: ArkhamDividerIcon[],
) => {
	const owners = new Map<string, Set<string>>();

	for (const story of stories) {
		if (isInvestigatorStory(story)) {
			continue;
		}

		const iconSet = getCampaignIconSet(story, icons);
		if (!iconSet) {
			continue;
		}

		const codes = owners.get(iconSet) ?? new Set<string>();
		codes.add(story.code);
		owners.set(iconSet, codes);
	}

	return new Set(
		[...owners.entries()]
			.filter(([, codes]) => codes.size === 1)
			.map(([iconSet]) => iconSet),
	);
};

const uniqueStoryCycles = (stories: Story[]) => {
	const counts = new Map<string, number>();

	for (const { cycle_code } of stories) {
		if (!cycle_code) {
			continue;
		}
		counts.set(cycle_code, (counts.get(cycle_code) ?? 0) + 1);
	}

	return new Set(
		[...counts.entries()]
			.filter(([, count]) => count === 1)
			.map(([cycle]) => cycle),
	);
};

const storyPacks = (story: Story) =>
	new Set(
		[
			story.pack_code,
			story.code,
			story.campaign_id,
			...(story.pack_codes ?? []),
		].filter((value): value is string => Boolean(value)),
	);

const belongsToStory = (
	icon: ArkhamDividerIcon,
	story: Story,
	packs: Set<string>,
	uniqueCycles: Set<string>,
) => {
	if (icon.pack_code) {
		return packs.has(icon.pack_code);
	}

	if (icon.cycle_code && uniqueCycles.has(icon.cycle_code)) {
		return icon.cycle_code === story.cycle_code;
	}

	return Boolean(
		icon.encounter_set_code &&
			story.encounter_sets.includes(icon.encounter_set_code),
	);
};

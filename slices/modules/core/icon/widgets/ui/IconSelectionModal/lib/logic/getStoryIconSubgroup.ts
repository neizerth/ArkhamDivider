import { isNotNil, prop, uniq } from "ramda";
import { getStoryScenarios } from "@/modules/story/shared/lib/logic/scenario/getStoryScenarios";
import type { Story } from "@/modules/story/shared/model";
import type { IconSubgroup } from "../../model";

export const getStoryIconSubgroup =
	(toIcon: (name?: string) => string | undefined) =>
	(story: Story): IconSubgroup => {
		const {
			encounter_sets,
			name,
			icon,
			code,
			pack_codes = [],
			pack_code,
			campaigns = [],
		} = story;
		const scenarios = getStoryScenarios(story);

		const campaignIcons = campaigns
			.map(prop("icon"))
			.concat([code, pack_code, ...pack_codes])
			.filter(isNotNil)
			.map(toIcon)
			.filter(isNotNil);

		const scenarioIcons = scenarios
			.map(prop("icon"))
			.filter(isNotNil)
			.map(toIcon);

		const icons = [
			icon,
			...campaignIcons,
			...encounter_sets.map(toIcon),
			...scenarioIcons,
		].filter(isNotNil);

		return {
			id: code,
			name,
			icon,
			icons: uniq(icons),
		};
	};

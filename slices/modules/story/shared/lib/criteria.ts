import { anyPass } from "ramda";
import type { Story } from "../model";

export const withoutReturns = (story: Story) => !story.return_to_code;

export const eqStoryType = (type: string) => (story: Story) =>
	story.type === type;

export const isCampaignContent = eqStoryType("campaign");
export const isSideStory = eqStoryType("side_story");
export const isSideCampaign = eqStoryType("side_campaign");
export const isChallengeStory = eqStoryType("challenge");
export const isStandaloneStory = eqStoryType("standalone");
export const isPromoStory = eqStoryType("promo");

export const isCampaign = anyPass([isCampaignContent, isSideCampaign]);

export const isMainCampaign = (story: Story) =>
	isCampaign(story) && !isReturnPack(story);

export const isCustom = (story: Story) => Boolean(story.custom_content);
export const withScenario = ({
	scenario_encounter_sets,
	scenario,
	scenarios = [],
}: Story) =>
	Boolean(scenario) ||
	scenario_encounter_sets.length > 0 ||
	scenarios.length > 0;

export const isSideContent = anyPass([isSideStory, isStandaloneStory]);

export const isReturnPack = (story: Story) => Boolean(story.return_to_code);

export const withReturnTo = (code: string) => (story: Story) =>
	story.return_to_code === code;

export const onlyWithScenarioEncounters = ({
	encounter_sets,
	scenario_encounter_sets,
}: Story) => {
	const encounters = encounter_sets.filter(
		(code) => !scenario_encounter_sets.includes(code),
	);
	return encounters.length === 0;
};

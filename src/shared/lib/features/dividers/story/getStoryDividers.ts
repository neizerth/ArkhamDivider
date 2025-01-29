import { arrayIf } from "@/shared/lib/features/util/common";
import type { AddStoryDividersOptions } from "@/shared/lib/store/features/addDividers/addDividers";
import type { IEncounterSet, IStory } from "@/shared/model/types/api";
import type { IDivider } from "@/shared/model/types/dividers";
import { ascend, prop, sortWith } from "ramda";
import { getCampaignDividers } from "./getCampaignDividers";
import { getEncounterDividers } from "./getEncounterDividers";
import { getScenarioDividers } from "./getScenarioDividers";

export type IGetStoryDividersOptions = AddStoryDividersOptions & {
	encounterSets: IEncounterSet[];
	returnStories?: IStory[];
};

export const getStoryDividers = (options: IGetStoryDividersOptions) => {
	const { returnStories = [], includeScenarios } = options;

	const scenarioDividers: IDivider[] = getScenarioDividers(options);

	const encounterDividers: IDivider[] = getEncounterDividers({
		...options,
	});

	const returnSetDividers: IDivider[] = returnStories.flatMap((story) =>
		getStoryDividers({
			...options,
			story,
			returnStories: [],
		}),
	);

	const campaignDividers: IDivider[] = getCampaignDividers(options);

	const dividers = [
		...campaignDividers,
		...arrayIf(includeScenarios, scenarioDividers),
		...encounterDividers,
		...returnSetDividers,
	];

	return sortWith([ascend(prop("type"))], dividers);
};

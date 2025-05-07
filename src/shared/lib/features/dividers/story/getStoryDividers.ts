import { IEncounterSet, IStory } from "@/shared/types/api";
import { IDivider } from "@/shared/types/dividers";
import { arrayIf } from "@/shared/lib/features/util/common";
import { ascend, prop, sortWith, uniqBy } from "ramda";
import { getScenarioDividers } from "./getScenarioDividers";
import { getEncounterDividers } from "./getEncounterDividers";
import { AddStoryDividersOptions } from "@/shared/store/features/addDividers/addDividers";
import { getCampaignDividers } from "./getCampaignDividers";

export type IGetStoryDividersOptions = AddStoryDividersOptions & {
  encounterSets: IEncounterSet[];
  returnStories?: IStory[];
  extraStory?: IStory;
};

export const getStoryDividers = (options: IGetStoryDividersOptions) => {
  const { returnStories = [], includeScenarios } = options;

  const scenarioDividers: IDivider[] = getScenarioDividers(options);

  const encounterDividers: IDivider[] = getEncounterDividers({
    ...options,
  });

  const returnSetDividers: IDivider[] = returnStories.flatMap((returnStory) =>
    getStoryDividers({
      ...options,
      story: returnStory,
      extraStory: options.story,
      returnStories: [],
    })
  );

  const campaignDividers: IDivider[] = getCampaignDividers(options);

  const dividers = [
    ...campaignDividers,
    ...arrayIf(includeScenarios, scenarioDividers),
    ...encounterDividers,
    ...returnSetDividers,
  ];

  const uniqueDividers = uniqBy(
    ({ icon, type }) => `${type}_${icon}`,
    dividers
  );

  return sortWith([ascend(prop("type"))], uniqueDividers);
};

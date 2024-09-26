import { IEncounterSet, IStory } from "@/types/api";
import { IDivider } from "@/types/dividers";
import { arrayIf } from "@/util/common";
import { ascend, isNotNil, prop, sortWith } from "ramda";
import { getScenarioDividers } from "./getScenarioDividers";
import { getEncounterDividers } from "./getEncounterDividers";
import { AddStoryDividersOptions } from "@/store/features/addDividers/addDividers";
import { getCampaignDividers } from "./getCampaignDividers";
import { getStoryScenarioIcons } from "./getStoryScenarioIcons";

export type IGetStoryDividersOptions = AddStoryDividersOptions & {
  encounterSets: IEncounterSet[]
  returnStories?: IStory[]
}

export const getStoryDividers = (options: IGetStoryDividersOptions) => {
  
  const {
    returnStories = [],
    includeScenarios
  } = options;

  const scenarioDividers: IDivider[] = getScenarioDividers(options);
  
  const scenarioIcons = getStoryScenarioIcons(options)

  const encounterDividers: IDivider[] = getEncounterDividers({
    ...options,
    scenarioIcons,
  })

  const returnSetDividers: IDivider[] = returnStories.map(story => getStoryDividers({
    ...options,
    story,
    returnStories: [],
  }))
  .flat();

  const campaignDividers: IDivider[] = getCampaignDividers(options);
  
  
  const dividers = [
    ...campaignDividers,
    ...arrayIf(includeScenarios, scenarioDividers),
    ...encounterDividers,
    ...returnSetDividers
  ];

  return sortWith([
    ascend(prop('type')),
  ], dividers);
}
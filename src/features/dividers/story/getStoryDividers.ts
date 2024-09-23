import { IEncounterSet, IStory } from "@/types/api";
import { IDivider } from "@/types/dividers";
import { arrayIf } from "@/util/common";
import { descend, isNotNil, prop, sortWith } from "ramda";
import { getScenarioDividers } from "./getScenarioDividers";
import { getEncounterDividers } from "./getEncounterDividers";
import { AddStoryDividersOptions } from "@/store/features/addDividers/addDividers";

export type IGetStoryDividersOptions = AddStoryDividersOptions & {
  encounterSets: IEncounterSet[]
  returnStories?: IStory[]
}

export const getStoryDividers = (options: IGetStoryDividersOptions) => {
  
  const {
    returnStories = [],
    includeScenarios,
  } = options;

  const scenarioDividers: IDivider[] = getScenarioDividers(options);
  
  const scenarioIcons = scenarioDividers
    .map(prop('icon'))
    .filter(isNotNil);

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
  
  const dividers = [
    ...arrayIf(includeScenarios, scenarioDividers),
    ...encounterDividers,
    ...returnSetDividers
  ];

  return sortWith([
    descend(prop('type')),
  ], dividers);
}
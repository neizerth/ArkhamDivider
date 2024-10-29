import { IEncounterSet, IStory } from "@/types/api"
import { isNotNil, prop, propEq, uniq } from "ramda"
import { getStoryScenarios } from "./getScenarioDividers";
import { getStoryScenarioIcons } from "./getStoryScenarioIcons";

export const getScenarioDividerIcons = (story: IStory) => {
  const scenarios = getStoryScenarios(story);
  
  return scenarios
    .map(prop('icon'))
    .filter(isNotNil);
}

export const getCampaignDividerIcons = ({
  icon,
  campaigns = []
}: IStory) => {
  return uniq([
      icon,
      ...campaigns.map(prop('icon'))
    ])
    .filter(isNotNil);
}

export type IGetCommonEncounterDividerIconsOptions = {
  story: IStory
  encounterSets: IEncounterSet[]
  includeScenarioEncounterSet: boolean
}

export type IGetEncounterDividerIconsOptions = IGetCommonEncounterDividerIconsOptions & {
  encounters: string[]
}

export const getRequiredEncounterDividersIcons = ({
  story, 
  encounterSets,
  includeScenarioEncounterSet
}: IGetCommonEncounterDividerIconsOptions) => {
  return getEncounterDividerIcons({
    story,
    encounters: story.encounter_sets,
    encounterSets,
    includeScenarioEncounterSet
  });
}

export const getExtraEncounterDividersIcons = ({
  story, 
  encounterSets,
  includeScenarioEncounterSet
}: IGetCommonEncounterDividerIconsOptions) => {
  return getEncounterDividerIcons({
    story,
    encounters: story.extra_encounter_sets,
    encounterSets,
    includeScenarioEncounterSet
  });
}

export const getEncounterDividerIcons = ({ 
  story, 
  encounterSets,
  encounters,
  includeScenarioEncounterSet
}: IGetEncounterDividerIconsOptions) => {
  const toIcon = (code: string) => encounterSets.find(
    propEq(code, 'code')
  )?.icon;

  const scenarioIcons = getStoryScenarioIcons({
    story,
    encounterSets
  });

  const filterScenarioIcons = (icon: string) => {
    if (!scenarioIcons.includes(icon)) {
      return true;
    }

    return includeScenarioEncounterSet;
  }

  const icons = encounters
    .map(toIcon)
    .filter(isNotNil)
    .filter(filterScenarioIcons);

  return icons;
}
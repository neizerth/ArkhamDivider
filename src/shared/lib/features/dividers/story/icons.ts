import { IEncounterSet, IStory } from "@/shared/types/api";
import { isNotNil, prop, propEq, uniq } from "ramda";
import { getStoryScenarios } from "./getScenarioDividers";

export const getScenarioDividerIcons = (story: IStory) => {
  const scenarios = getStoryScenarios(story);

  return scenarios.map(prop("icon")).filter(isNotNil);
};

export const getCampaignDividerIcons = ({ icon, campaigns = [] }: IStory) => {
  return uniq([icon, ...campaigns.map(prop("icon"))]).filter(isNotNil);
};

export type IGetCommonEncounterDividerIconsOptions = {
  story: IStory;
  encounterSets: IEncounterSet[];
  includeScenarioEncounterSet: boolean;
};

export type IGetEncounterDividerIconsOptions =
  IGetCommonEncounterDividerIconsOptions & {
    encounters: string[];
  };

export const getRequiredEncounterDividersIcons = ({
  story,
  encounterSets,
}: IGetCommonEncounterDividerIconsOptions) => {
  return getEncounterDividerIcons({
    story,
    encounters: story.encounter_sets,
    encounterSets,
    includeScenarioEncounterSet: false,
  });
};

export const getExtraEncounterDividersIcons = ({
  story,
  encounterSets,
}: IGetCommonEncounterDividerIconsOptions) => {
  return getEncounterDividerIcons({
    story,
    encounters: story.extra_encounter_sets,
    encounterSets,
    includeScenarioEncounterSet: false,
  });
};

export const getEncounterDividerIcons = ({
  story,
  encounterSets,
  encounters,
  includeScenarioEncounterSet,
}: IGetEncounterDividerIconsOptions) => {
  const toEncounterSet = (code: string) =>
    encounterSets.find(propEq(code, "code"));

  const scenarios = getStoryScenarios(story);
  const scenarioNames = scenarios.map(({ scenario_name }) =>
    scenario_name.toLowerCase()
  );

  const filterScenarios = (code: string) => {
    const encounter = toEncounterSet(code);
    if (!encounter) {
      return;
    }
    const encounterName = encounter.name.toLowerCase();

    if (!scenarioNames.includes(encounterName)) {
      return encounter;
    }

    if (!includeScenarioEncounterSet) {
      return;
    }

    return encounter;
  };

  const icons = encounters
    .map(filterScenarios)
    .filter(isNotNil)
    .map(prop("icon"))
    .filter(isNotNil);

  return icons;
};

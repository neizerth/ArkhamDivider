import { IEncounterSet, IStory } from "@/shared/types/api";
import { isNotNil, prop, propEq, uniq, uniqBy } from "ramda";
import { getStoryScenarios } from "./getScenarioDividers";

export const getScenarioDividerIcons = (story: IStory) => {
  const scenarios = getStoryScenarios(story);

  const uniqueScenarios = uniqBy(({ full_name }) => full_name, scenarios);

  return uniqueScenarios.map(prop("icon")).filter(isNotNil);
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

  const encountrWithIcons = encounters.map(filterScenarios).filter(isNotNil);

  const uniqueEncounters = uniqBy(prop("name"), encountrWithIcons);

  const icons = uniqueEncounters.map(prop("icon")).filter(isNotNil);

  return icons;
};

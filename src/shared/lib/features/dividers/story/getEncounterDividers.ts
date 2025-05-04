import { isNotNil, prop, propEq, toLower } from "ramda";
import { getEncounterSize } from "./getEncounterSize";
import { uniqId } from "@/shared/lib/features/util/common";
import { IGetStoryDividersOptions } from "./getStoryDividers";
import { DividerType } from "@/shared/types/dividers";
import { getStoryScenarios } from "./getScenarioDividers";

type IGetEncounterDividersParams = IGetStoryDividersOptions;

export const getEncounterDividers = (options: IGetEncounterDividersParams) => {
  const {
    story,
    includeExtraSets,
    includeScenarioEncounterSet,
    includeCampaignIcon,
    includeEncounters,
    encounterSets,
  } = options;

  if (!includeEncounters && !includeScenarioEncounterSet && !includeExtraSets) {
    return [];
  }

  const { icon, encounter_sets, extra_encounter_sets } = story;

  const scenarios = getStoryScenarios(story);
  const scenarioNames = scenarios.map(prop("scenario_name")).map(toLower);

  const campaignIcon = icon;

  const extraEncounters = includeExtraSets ? extra_encounter_sets : [];

  const encounters = [...encounter_sets, ...extraEncounters];

  const encounterDividers = encounters
    .map((code) => {
      const isExtra = extra_encounter_sets.includes(code);
      const encounter = encounterSets.find(propEq(code, "code"));

      if (!encounter) {
        return;
      }

      const { name, icon } = encounter;

      const isScenario =
        Boolean(icon) && scenarioNames.includes(name.toLowerCase());

      if (!includeScenarioEncounterSet && isScenario) {
        return;
      }

      if (!isScenario && !includeEncounters && !includeExtraSets) {
        return;
      }

      if (!includeEncounters && !isExtra) {
        return;
      }

      const sizeData = getEncounterSize({
        ...options,
        isExtra,
        encounter,
      });

      return {
        id: uniqId() + code,
        ...sizeData,
        story,
        name,
        icon,
        campaignIcon,
        encounterSet: encounter,
        type: DividerType.ENCOUNTER,
        displayCampaignIcon: includeCampaignIcon,
      };
    })
    .filter(isNotNil);

  if (!includeScenarioEncounterSet) {
    return encounterDividers;
  }

  const scenarioEncounterDividers = scenarios
    .filter(({ icon }) => !encounterDividers.find(propEq(icon, "icon")))
    .map(({ scenario_name, id, icon }) => ({
      id: uniqId() + id,
      story,
      name: scenario_name,
      icon,
      campaignIcon,
      type: DividerType.ENCOUNTER,
      displayCampaignIcon: includeCampaignIcon,
    }));

  return [...encounterDividers, ...scenarioEncounterDividers];
};

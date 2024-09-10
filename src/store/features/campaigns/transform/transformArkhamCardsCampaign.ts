import { IArkhamCardsCampaign, IArkhamCardsScenarioDetail } from "@/types/arkhamCards";
import { ICampaign } from "@/types/campaigns";
import { unique } from "@/util/common";

export const scenarioToEncounterSets = ({ steps }: IArkhamCardsScenarioDetail) => {
  return steps.map(({ encounter_sets }) => encounter_sets)
    .filter(x => Boolean(x))
    .flat() as string[];
}

export const transformArkhamCardsCampaign = ({ campaign, scenarios }: IArkhamCardsCampaign): ICampaign => {
  const encounterSets = scenarios.map(scenarioToEncounterSets).flat();
  const uniqueEncounterSets = unique(encounterSets);

  return {
    unique_encounter_sets: uniqueEncounterSets,
    campaign,
    scenarios: scenarios.map(({ 
        id,
        scenario_name,
        full_name,
        setup,
        icon
      }) => ({
        id, 
        scenario_name,
        full_name,
        setup,
        icon
      }))
  }
}

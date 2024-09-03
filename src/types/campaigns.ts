import { IArkhamCardsCampaign, IArkhamCardsScenarioDetail } from "@/types/arkhamCards";

export type ICampaignScenario = Omit<IArkhamCardsScenarioDetail, 'steps'>;

export type ICampaign = Omit<IArkhamCardsCampaign, 'scenarios'> & {
  unique_encounter_sets: string[];
  scenarios: ICampaignScenario[]
}

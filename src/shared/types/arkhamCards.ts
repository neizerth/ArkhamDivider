export type IArkhamCardsScenarioStep = {
  id: string;
  type: string;
  encounter_sets?: string[]
}

export type IArkhamCardsScenarioDetail = {
  id: string;
  scenario_name: string;
  full_name: string;
  setup: string[];
  icon: string;
  steps: IArkhamCardsScenarioStep[];
}

export type IArkhamCardsCampaign = {
  campaign: {
    id: string;
    position: number;
    version: number;
    name: string;
    scenarios: string[];
  }
  scenarios: IArkhamCardsScenarioDetail[]
}

export type IArkhamCardsScenario = {
  id: string,
  name: string
}
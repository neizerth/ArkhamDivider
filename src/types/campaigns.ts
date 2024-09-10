import { IArkhamCardsScenarioDetail } from "@/types/arkhamCards";
import { IArkhamData } from "arkham-divider-data";

export type ICampaignScenario = Omit<IArkhamCardsScenarioDetail, 'steps'>;

export type ICampaign = IArkhamData.Core['campaigns'][number];
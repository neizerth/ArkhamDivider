import { IArkhamCardsCampaign } from "@/types/arkhamCards";
import { ICampaign } from "../campaigns";

export const findCoreCampaign = (({ campaign }: ICampaign) => campaign.id === 'core' && campaign.position === 0)

export const getCoreEntrounterSet = (campaigns: ICampaign[]) => campaigns.find(findCoreCampaign)?.unique_encounter_sets || [];
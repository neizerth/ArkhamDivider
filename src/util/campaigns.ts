import { ICampaign } from "@/types/campaigns";

export const isCoreCampaign = (campaign: ICampaign) => campaign.id === 'core' && campaign.position === 0;

export const getCoreEntrounterSet = (campaigns: ICampaign[]) => campaigns.find(isCoreCampaign)?.encounter_sets || [];

export const hasSets = ({ encounter_sets }: ICampaign, encounterSets: string[]) => 
  encounter_sets.some(id => encounterSets.includes(id))
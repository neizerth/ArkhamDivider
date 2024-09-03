import { ICampaign } from "@/types/campaigns";

export const isCoreCampaign = ({ campaign }: ICampaign) => campaign.id === 'core' && campaign.position === 0;

export const getCoreEntrounterSet = (campaigns: ICampaign[]) => campaigns.find(isCoreCampaign)?.unique_encounter_sets || [];

export const hasSets = ({ unique_encounter_sets }: ICampaign, encounterSets: string[]) => 
  unique_encounter_sets.some(id => encounterSets.includes(id))
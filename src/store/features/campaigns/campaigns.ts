import { fetchCampaigns } from '@/api/arkhamCards';
import { AppThunk } from '@/store';
import { IArkhamCardsCampaign, IArkhamCardsScenarioDetail } from '@/types/arkhamCards';
import { unique } from '@/util/common';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';

export type ICampaignScenario = Omit<IArkhamCardsScenarioDetail, 'steps'>;

export type ICampaign = Omit<IArkhamCardsCampaign, 'scenarios'> & {
  unique_encounter_sets: string[];
  scenarios: ICampaignScenario[]
}

export type ICampaignsState = {
  list: ICampaign[]
}

const initialState: ICampaignsState = {
  list: []
};

export const campaigns = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaigns: createSliceSetter('list')
  },
  selectors: {
    selectCampaigns: createSliceSelector('list')
  }
});

export const scenarioToEncounterSets = ({ steps }: IArkhamCardsScenarioDetail) => {
  const step = steps.find(({ id }) => id === 'gather_encounter_sets');

  return step?.encounter_sets || [];
}

export const transformArkhamCampaign = ({ campaign, scenarios }: IArkhamCardsCampaign): ICampaign => {
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

export const loadCampaigns: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  const response = await fetchCampaigns(language);
  const campaigns: IArkhamCardsCampaign[] = await response.json();
  const list = campaigns.map(transformArkhamCampaign);
  
  dispatch(setCampaigns(list));
}

export const {
  setCampaigns
} = campaigns.actions;

export const {
  selectCampaigns
} = campaigns.selectors;

export default campaigns.reducer;
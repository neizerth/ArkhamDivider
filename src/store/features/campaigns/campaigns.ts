import { fetchCampaigns } from '@/api/arkhamCards';
import { AppThunk } from '@/store';
import { IArkhamCardsCampaign, IArkhamCardsScenarioDetail } from '@/types/arkhamCards';
import { unique } from '@/util/common';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { transformArkhamCardsCampaign } from './transform/transformArkhamCardsCampaign';
import { getCoreEntrounterSet } from './transform/getCoreEntrounterSet';

export type ICampaignScenario = Omit<IArkhamCardsScenarioDetail, 'steps'>;

export type ICampaign = Omit<IArkhamCardsCampaign, 'scenarios'> & {
  unique_encounter_sets: string[];
  scenarios: ICampaignScenario[]
}

export type ICampaignsState = {
  list: ICampaign[]
  coreEncounterSet: string[]
}

const initialState: ICampaignsState = {
  list: [],
  coreEncounterSet: []
};

export const campaigns = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaigns: createSliceSetter('list'),
    setCoreEncounterSet: createSliceSetter('coreEncounterSet'),
  },
  selectors: {
    selectCampaigns: createSliceSelector('list'),
    selectCoreEncounterSet: createSliceSelector('coreEncounterSet')
  }
});


export const loadCampaigns: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  const response = await fetchCampaigns(language);
  const campaigns: IArkhamCardsCampaign[] = await response.json();
  const list = campaigns.map(transformArkhamCardsCampaign);
  const coreEncounterSet = getCoreEntrounterSet(list);
  
  dispatch(setCampaigns(list));
  dispatch(setCoreEncounterSet(coreEncounterSet));
}

export const {
  setCampaigns,
  setCoreEncounterSet
} = campaigns.actions;

export const {
  selectCampaigns,
  selectCoreEncounterSet
} = campaigns.selectors;

export default campaigns.reducer;
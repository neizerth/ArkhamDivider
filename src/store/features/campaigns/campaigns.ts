import { fetchCampaigns } from '@/api/arkhamCards';
import { AppThunk } from '@/store';
import { IArkhamCardsCampaign } from '@/types/arkhamCards';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { transformArkhamCardsCampaign } from './transform/transformArkhamCardsCampaign';
import { getCoreEntrounterSet } from '../../../util/campaigns';
import { refreshDividers } from '../dividers/dividers';
import { ICampaign } from '@/types/campaigns';

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
  dispatch(refreshDividers());
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
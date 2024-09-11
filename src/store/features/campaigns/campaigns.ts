
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { createSlice } from '@reduxjs/toolkit';
import { ICampaign } from '@/types/api';

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


export const {
  setCampaigns,
  setCoreEncounterSet
} = campaigns.actions;

export const {
  selectCampaigns,
  selectCoreEncounterSet
} = campaigns.selectors;

export default campaigns.reducer;
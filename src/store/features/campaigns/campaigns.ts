import { fetchCampaigns } from '@/api/arkhamCards';
import { AppThunk } from '@/store';
import { IArkhamCardsCampaign } from '@/types/arkhamCards';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';

export type ICampaignsState = {
  list: IArkhamCardsCampaign[]
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

export const transformArkhamCampaign = ({ campaign, scenarios }: IArkhamCardsCampaign): IArkhamCardsCampaign => {
  return {
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
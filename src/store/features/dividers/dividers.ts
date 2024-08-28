import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';
import { AppThunk } from '@/store';
import { IArkhamCardsCampaign } from '@/types/arkhamCards';
import { ICampaign, selectCampaigns } from '../campaigns/campaigns';

export type IDividersState = {
  campaign?: ICampaign;
  list: IDividerList
}

const initialState: IDividersState = {
  list: []
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    setCampaign: createSliceSetter('campaign'),
    setDividers: createSliceSetter('list')
  },
  selectors: {
    selectCampaign: createSliceSelector('campaign'),
    selectDividers: createSliceSelector('list')
  }
});

const campaignToDividers = ({ scenarios, unique_encounter_sets }: ICampaign): IDividerList => {
  const encounterSetDividers = unique_encounter_sets
    .map(id => ({
      id
    }));

  const scenarioDividers = scenarios
    .filter(({ icon }) => icon)
    .map(({ id, icon, scenario_name }) => ({
      id,
      icon,
      name: scenario_name
    }));

  return [
    // ...scenarioDividers,
    ...encounterSetDividers
  ];
  // const encounterSets = scenarios 
  // scenarios
  // .map(({ id, icon, scenario_name }) => ({
  //   id,
  //   icon,
  //   title: scenario_name
  // }))
}

export const changeCampaign: ActionCreator<AppThunk> = (id: string) => (dispatch, getState) => {
  const campaign = selectCampaigns(getState())
    .find(({ campaign }) => campaign.id === id);

  const dividers = campaign ? campaignToDividers(campaign) : [];

  console.log({id, campaign, dividers})

  dispatch(setCampaign(campaign));
  dispatch(setDividers(dividers));
}

export const {
  setCampaign,
  setDividers
} = dividers.actions;

export const {
  selectCampaign,
  selectDividers
} = dividers.selectors;

export default dividers.reducer;
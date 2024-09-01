import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';
import { AppThunk } from '@/store';
import { IArkhamCardsCampaign } from '@/types/arkhamCards';
import { ICampaign, selectCampaigns, selectCoreEncounterSet } from '../campaigns/campaigns';
import { createTranslation, getLanguage } from '@/util/i18n';
import { I18N_NAMESPACE } from '@/constants/i18n';

export type IDividersState = {
  includeCoreSet: boolean;
  campaign: ICampaign | null;
  list: IDividerList
}

const initialState: IDividersState = {
  campaign: null,
  includeCoreSet: false,
  list: []
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    setIncludeCoreSet: createSliceSetter('includeCoreSet'),
    setCampaign: createSliceSetter('campaign'),
    setDividers: createSliceSetter('list')
  },
  selectors: {
    selectIncludeCoreSet: createSliceSelector('includeCoreSet'),
    selectCampaign: createSliceSelector('campaign'),
    selectDividers: createSliceSelector('list'),
  }
});

const campaignToDividers = ({ unique_encounter_sets }: ICampaign, excludeSets: string[] = []): IDividerList => {
  const ns = I18N_NAMESPACE.ENCOUNTER_SETS;
  const t = createTranslation(ns);
  const toEnglish = createTranslation(ns, 'en');
  const currentLanguage = getLanguage();

  const encounterSetToDivider = (id: string) => {
    const name = t(id);
    const originalName = toEnglish(id);
    const language = name === originalName ? 'en' : currentLanguage;
    
    return {
      id,
      icon: id,
      name,
      language
    }
  }

  return unique_encounter_sets
    .filter(id => !excludeSets.includes(id))
    .map(encounterSetToDivider);
}

export const refreshDividers: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const state = getState();
  const campaign = selectCampaign(state);
  if (!campaign) {
    return;
  }
  const includeCoreSet = selectIncludeCoreSet(state);
  const coreEncounterSet = selectCoreEncounterSet(state);
  const dividers = campaignToDividers(campaign, includeCoreSet ? [] : coreEncounterSet);

  dispatch(setDividers(dividers));
}


export const changeCampaign: ActionCreator<AppThunk> = (id: string) => (dispatch, getState) => {
  const campaign = selectCampaigns(getState())
    .find(({ campaign }) => campaign.id === id);

  dispatch(setCampaign(campaign || null));
  dispatch(refreshDividers());
}

export const toggleIncludeCoreSet: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const includeCoreSet = selectIncludeCoreSet(getState());

  dispatch(setIncludeCoreSet(!includeCoreSet));
}

export const {
  setCampaign,
  setDividers,
  setIncludeCoreSet,
} = dividers.actions;

export const {
  selectCampaign,
  selectDividers,
  selectIncludeCoreSet
} = dividers.selectors;

export default dividers.reducer;
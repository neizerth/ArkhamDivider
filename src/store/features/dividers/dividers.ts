import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';
import { AppThunk } from '@/store';
import { ICampaign, selectCampaigns, selectCoreEncounterSet } from '../campaigns/campaigns';
import { createTranslation } from '@/util/i18n';
import { I18N_NAMESPACE } from '@/constants/i18n';
import { selectLanguage } from '../language/language';
import { isCoreCampaign } from '@/util/campaigns';

export type IDividersState = {
  hiddenSets: string[];
  includeCoreSet: boolean;
  campaign: ICampaign | null;
  color: boolean;
  list: IDividerList
}

const initialState: IDividersState = {
  hiddenSets: [],
  color: true,
  campaign: null,
  includeCoreSet: false,
  list: []
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    setHiddenSets: createSliceSetter('hiddenSets'),
    setIncludeCoreSet: createSliceSetter('includeCoreSet'),
    setCampaign: createSliceSetter('campaign'),
    setDividers: createSliceSetter('list'),
    setColor: createSliceSetter('color')
  },
  selectors: {
    selectHiddenSets: createSliceSelector('hiddenSets'),
    selectIncludeCoreSet: createSliceSelector('includeCoreSet'),
    selectCampaign: createSliceSelector('campaign'),
    selectDividers: createSliceSelector('list'),
    selectColor: createSliceSelector('color')
  }
});

export type ICampaignToDividersOptions = {
  excludeSets?: string[],
  currentLanguage: string
}

const campaignToDividers = ({ unique_encounter_sets }: ICampaign, options: ICampaignToDividersOptions): IDividerList => {
  const { excludeSets = [], currentLanguage } = options;
  const ns = I18N_NAMESPACE.ENCOUNTER_SETS;
  const t = createTranslation(ns);
  const toEnglish = createTranslation(ns, 'en');

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
  const isCore = isCoreCampaign(campaign);
  const language = selectLanguage(state);
  const includeCoreSet = isCore || selectIncludeCoreSet(state);
  const coreEncounterSet = selectCoreEncounterSet(state);
  const dividers = campaignToDividers(campaign, {
    excludeSets: includeCoreSet ? [] : coreEncounterSet,
    currentLanguage: language
  });

  dispatch(setDividers(dividers));
}

export const toggleIncludeCoreSet: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const includeCoreSet = selectIncludeCoreSet(getState());

  dispatch(setIncludeCoreSet(!includeCoreSet));
}

export const hideSet: ActionCreator<AppThunk> = (id: string) => (dispatch, getState) => {
  const hiddenSets = selectHiddenSets(getState());

  dispatch(setHiddenSets([...hiddenSets, id]));
}

export const showAllSets: ActionCreator<AppThunk> = () => (dispatch) => {
  dispatch(setHiddenSets([]));
}

export const {
  setCampaign,
  setDividers,
  setIncludeCoreSet,
  setHiddenSets,
  setColor
} = dividers.actions;

export const {
  selectCampaign,
  selectDividers,
  selectIncludeCoreSet,
  selectHiddenSets,
  selectColor
} = dividers.selectors;

export default dividers.reducer;
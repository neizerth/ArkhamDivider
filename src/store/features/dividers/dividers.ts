import { ActionCreator, createSlice } from '@reduxjs/toolkit';

import { createSliceSetter, createSliceSelector } from '@/util/slice';
import { IDividerList } from '@/types/dividers';
import { AppThunk } from '@/store';
import { createTranslation } from '@/util/i18n';
import { I18N_NAMESPACE } from '@/constants/i18n';
import { ICampaign } from '@/types/api';

export type IDividersState = {
  hiddenSets: string[];
  includeExtraSets: boolean;
  campaigns: ICampaign[];
  color: boolean;
  list: IDividerList
}

const initialState: IDividersState = {
  hiddenSets: [],
  color: true,
  campaigns: [],
  includeExtraSets: false,
  list: []
};

export const dividers = createSlice({
  name: 'dividers',
  initialState,
  reducers: {
    setHiddenSets: createSliceSetter('hiddenSets'),
    setIncludeExtraSets: createSliceSetter('includeExtraSets'),
    setCampaigns: createSliceSetter('campaigns'),
    setDividers: createSliceSetter('list'),
    setColor: createSliceSetter('color')
  },
  selectors: {
    selectHiddenSets: createSliceSelector('hiddenSets'),
    selectIncludeExtraSets: createSliceSelector('includeExtraSets'),
    selectCampaigns: createSliceSelector('campaigns'),
    selectDividers: createSliceSelector('list'),
    selectColor: createSliceSelector('color')
  }
});

export type ICampaignToDividersOptions = {
  excludeSets?: string[],
  currentLanguage: string
}

const campaignToDividers = ({ encounter_sets }: ICampaign, options: ICampaignToDividersOptions): IDividerList => {
  const { excludeSets = [], currentLanguage } = options;
  const ns = I18N_NAMESPACE.ENCOUNTER_SETS;
  const t = createTranslation(ns);
  const toEnglish = createTranslation(ns, 'en');

  const encounterSetToDivider = (id: string) => {
    const localName = t(id);
    const originalName = toEnglish(id);
    const language = localName === originalName ? 'en' : currentLanguage;
    
    return {
      id,
      icon: id,
      name: localName,
      language
    }
  }

  return encounter_sets
    .filter(id => !excludeSets.includes(id))
    .map(encounterSetToDivider);
}

export const refreshDividers: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const state = getState();
  const campaign = selectCampaign(state);
  if (!campaign) {
    return;
  }
  // const encounterCodes = campaign.encounter_sets;
  // const encounters = selectEncounterSets(state);
  
  // const language = selectLanguage(state);
  // const coreEncounterSet = selectCoreEncounterSet(state);

  const dividers = []

  dispatch(setDividers(dividers));
}

export const toggleIncludeExtraSets: ActionCreator<AppThunk> = () => (dispatch, getState) => {
  const includeSets = selectIncludeExtraSets(getState());

  dispatch(setIncludeExtraSets(!includeSets));
}

export const hideSet: ActionCreator<AppThunk> = (id: string) => (dispatch, getState) => {
  const hiddenSets = selectHiddenSets(getState());

  dispatch(setHiddenSets([...hiddenSets, id]));
}

export const showAllSets: ActionCreator<AppThunk> = () => (dispatch) => {
  dispatch(setHiddenSets([]));
}

export const {
  setDividers,
  setIncludeExtraSets,
  setHiddenSets,
  setColor
} = dividers.actions;

export const {
  selectDividers,
  selectIncludeExtraSets,
  selectHiddenSets,
  selectColor
} = dividers.selectors;

export default dividers.reducer;
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { selectReturnSetsOf } from '../stories/stories';
import { selectEncounterSets } from '../encounterSets/encounterSets';
import { AppThunk } from '@/store';
import { getStoryDividers } from '@/features/dividers/story/getStoryDividers';
import { addDividers } from '../dividers/dividers';
import { IStory } from '@/types/api';

export type IAddDividersFormState = {
  form: {
    includeExtraSets: boolean
    includeReturnSets: boolean
    includeScenarios: boolean
    includeEncounterSize: boolean
    includeCampaignIcon: boolean
    includeScenarioEncounterSet: boolean
    includeScenarioSize: boolean
  }
}

const initialState: IAddDividersFormState = {
  form: {
    includeExtraSets: false,
    includeReturnSets: false,
    includeScenarios: true,
    includeEncounterSize: false,
    includeCampaignIcon: false,
    includeScenarioEncounterSet: false,
    includeScenarioSize: false
  }
};

export const addDividersForm = createSlice({
  name: 'addDividersForm',
  initialState,
  reducers: {
    setDividerFormConfig: createSliceSetter('form')
  },
  selectors: {
    selectDividerFormConfig: createSliceSelector('form')
  }
});

export const addStoryDividers: ActionCreator<AppThunk> = (story: IStory) => (dispatch, getState) => {
  const state = getState();

  const encounterSets = selectEncounterSets(state);
  const config = selectDividerFormConfig(state);
 
  const selectReturnSets = selectReturnSetsOf(story.code);
  const { includeReturnSets } = config;
  const returnStories = includeReturnSets ? selectReturnSets(state) : [];

  const dividers = getStoryDividers({
    story,
    ...config,
    returnStories,
    encounterSets
  });

  dispatch(addDividers(dividers));
}

export const {
  setDividerFormConfig
} = addDividersForm.actions;

export const {
  selectDividerFormConfig
} = addDividersForm.selectors;

export default addDividersForm.reducer;
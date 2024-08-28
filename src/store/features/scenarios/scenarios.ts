import { fetchScenarioNames } from '@/api/arkhamCards';
import { AppThunk } from '@/store';
import { IArkhamCardsScenario } from '@/types/arkhamCards';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IScenariosState = {
  loading: boolean;
  list: IArkhamCardsScenario[];
}

const initialState: IScenariosState = {
  loading: true,
  list: []
};

export type SetScenariosPayload = PayloadAction<Required<IScenariosState>>;

export const scenarios = createSlice({
  name: 'scenarios',
  initialState,
  reducers: {
    setScenarios: createSliceSetter('list')
  },
  selectors: {
    selectScenarios: createSliceSelector('list')
  }
});

export const {
  setScenarios
} = scenarios.actions;

export const loadScenarios: ActionCreator<AppThunk> = (language: string) => async dispatch => {
  const response = await fetchScenarioNames(language);
  const list: IArkhamCardsScenario[] = await response.json();
  
  dispatch(setScenarios(list));
}

export const {
  selectScenarios
} = scenarios.selectors;

export default scenarios.reducer;
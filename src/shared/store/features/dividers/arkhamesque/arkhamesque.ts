import { type ActionCreator, createSelector, createSlice } from '@reduxjs/toolkit';
import type { IArkhamesqueBuild } from 'arkhamesque-classic-divider-data';
import { prop } from 'ramda';
import { createSliceState } from 'redux-toolkit-helpers';
import { fetchArkhamesqueData } from '@/shared/api/arkhamesqueClassic';
import type { AppThunk } from '@/shared/store';
import { Nullable } from '@/shared/types/util';

export type IArkhamesqueState = {
  data: Nullable<IArkhamesqueBuild>;
};

const initialState: IArkhamesqueState = {
  data: null,
};

export const arkhamesque = createSlice({
  name: 'arkhamesque',
  ...createSliceState(initialState),
});

export const loadArkhamesqueData: ActionCreator<AppThunk> = () => async (dispatch, getState) => {
  const state = getState();
  const currentData = selectArkhamesqueData(state);
  if (currentData) {
    return;
  }
  const data = await fetchArkhamesqueData();
  dispatch(setArkhamesqueData(data));
};

export const { setData: setArkhamesqueData } = arkhamesque.actions;

export const { selectData: selectArkhamesqueData } = arkhamesque.selectors;

export const selectArkhamesqueClassicInvestigators = createSelector(
  [selectArkhamesqueData],
  (arkhamesqueData) => {
    if (!arkhamesqueData) {
      return [];
    }
    return arkhamesqueData.investigators.flatMap(({ data }) => data.map(prop('code')));
  }
);

export default arkhamesque.reducer;

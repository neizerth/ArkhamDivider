import { fetchArkhamesqueData } from '@/api/arkhamesqueClassic';
import { AppThunk } from '@/store';
import { createSliceSelector, createSliceSetter } from '@/util/slice';
import { ActionCreator, createSlice } from '@reduxjs/toolkit';
import { IArkhamesqueBuild } from 'arkhamesque-classic-divider-data';

export type IArkhamesqueState = {
  data: IArkhamesqueBuild | null
}

const initialState: IArkhamesqueState = {
  data: null,
};

export const arkhamesque = createSlice({
  name: 'arkhamesque',
  initialState,
  reducers: {
    setArkhamesqueData: createSliceSetter('data') 
  },
  selectors: {
    selectArkhamesqueData: createSliceSelector('data')
  }
});

export const loadArkhamesqueData: ActionCreator<AppThunk> = () => async (dispatch, getState) => {
  const state = getState();
  const currentData = selectArkhamesqueData(state);
  if (currentData) {
    return;
  }
  const data = await fetchArkhamesqueData();
  dispatch(setArkhamesqueData(data));
}

export const {
  setArkhamesqueData
} = arkhamesque.actions;

export const {
  selectArkhamesqueData
} = arkhamesque.selectors;

export default arkhamesque.reducer;
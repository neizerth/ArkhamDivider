import { ActionCreator } from '@reduxjs/toolkit';
import { TabPosition } from '@/components/dividers/vintage/VintageDivider/features/tabPosition';
import { AppThunk } from '@/shared/store';
import { selectDividers, setDividers } from '@/shared/store/features/dividers/dividers';

export const moveTab: ActionCreator<AppThunk> =
  (id: string, tabPosition: TabPosition) => (dispatch, getState) => {
    const state = getState();
    const dividers = selectDividers(state);

    const data = dividers.map((divider) => {
      if (divider.id === id) {
        return {
          ...divider,
          customParams: {
            tabPosition,
          },
        };
      }

      return divider;
    });

    dispatch(setDividers(data));
  };

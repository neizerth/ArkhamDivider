import type { IStory } from '@/shared/types/api';
import { Nullable } from '@/shared/types/util';
import { selectIsArkhamesqueLayout } from '../../layout/layout';
import {
  selectArkhamesqueData,
  selectArkhamesqueClassicInvestigators as selectInvestigators,
} from '../arkhamesque/arkhamesque';
import { createSelector } from '@reduxjs/toolkit';

export const selectStoryInvestigators = (story: Nullable<IStory>) =>
  createSelector(
    [selectIsArkhamesqueLayout, selectInvestigators, selectArkhamesqueData],
    (isArkhamesqueLayout, arkhamesqueInvestigators, data) => {
      if (!story) {
        return [];
      }

      if (!isArkhamesqueLayout) {
        return story.investigators;
      }

      if (!data) {
        return [];
      }

      return story.investigators.filter(({ code, alternate_of }) =>
        arkhamesqueInvestigators.includes(alternate_of || code)
      );
    }
  );

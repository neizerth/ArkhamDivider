import { IStory } from '@/shared/types/api';
import { DividerType, IDivider } from '@/shared/types/dividers';
import { uniqId } from '../../util/common';

type IGetExtraStoryDividersOptions = {
  story: IStory;
};

export const getExtraStoryDividers = (options: IGetExtraStoryDividersOptions) => {
  const { story } = options;

  if (story.code === 'tsk') {
    const concealedDivider: IDivider = {
      id: uniqId(),
      story,
      name: 'Concealed cards',
      icon: 'special_cards',
      type: DividerType.ENCOUNTER,
      customParams: {
        concealed: true,
      },
    };
    return [concealedDivider];
  }

  return [];
};

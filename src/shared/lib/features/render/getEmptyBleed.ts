import { IEqualLayoutBleed, ILayoutBleed } from '@/shared/types/layouts';

export const getEmptyBleed = (bleed: ILayoutBleed): IEqualLayoutBleed => {
  return {
    ...bleed,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    size: 0,
  };
};

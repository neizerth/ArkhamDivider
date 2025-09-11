import { IXPCost, XPCost } from '@/shared/types/game';

export const fixedXPCosts: IXPCost[] = [
  XPCost.NO_COST,
  XPCost.ZERO,
  XPCost.ONE,
  XPCost.TWO,
  XPCost.THREE,
  XPCost.FOUR,
  XPCost.FIVE,
].map((level) => {
  if (level < 0) {
    return {
      value: '—',
      level,
      is_fixed: true,
    };
  }
  return {
    value: level.toString(),
    level,
    is_fixed: true,
  };
});

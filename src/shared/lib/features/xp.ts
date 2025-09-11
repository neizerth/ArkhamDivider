import { MAX_XP } from '@/shared/config/xp';

export const getXPDisplayValue = (from: number, to: number, separator = ' - '): string => {
  if (to === MAX_XP) {
    return `${from}+`;
  }
  return `${from}${separator}${to}`;
};

import { INVESTIGATORS_URL } from '@/shared/config/app';

export const getDividerBackground = (code: string) => {
  return `${INVESTIGATORS_URL}/images/${code}.jpg`;
};

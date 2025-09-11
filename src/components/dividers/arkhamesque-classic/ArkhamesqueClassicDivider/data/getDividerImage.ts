import { identity } from 'ramda';
import { ARKHAMESQUE_URL } from '@/shared/config/app';

export const getDividerImage = (data: (string | undefined | false)[]) => {
  const path = data.filter(identity).join('');
  return `${ARKHAMESQUE_URL}/images/${path}.jpg`;
};

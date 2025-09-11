import { propEq } from 'ramda';
import type { GetDividerDataOptions } from './getDividerData';
import { getDividerImage } from './getDividerImage';

export const getInvestigatorsDividerData = ({ data, divider }: GetDividerDataOptions) => {
  const { investigator } = divider;

  if (!investigator) {
    return;
  }

  const investigators = data.investigators.flatMap((category) =>
    category.data.map((item) => ({
      prefix: category.prefix,
      ...item,
    }))
  );

  const getInvestigatorById = (id?: string) => id && investigators.find(propEq(id, 'code'));

  const { code, alternate_of } = investigator;

  const item = getInvestigatorById(code) || getInvestigatorById(alternate_of);

  if (!item) {
    return;
  }

  return {
    image: getDividerImage([data.prefix, item.prefix, item.name]),
    icon: false,
  };
  // const
};

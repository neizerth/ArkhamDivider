
import { layouts } from '@/data/layouts';
import { ILayout, LayoutOrientation, LayoutType } from "@/types/layouts";
import { propsEquals } from './criteria';
import { propEq } from 'ramda';

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: LayoutOrientation) => layouts.filter(({ orientation }) => orientation === layoutType);

export const getLayouts = ({
  type,
  categoryId,
  ...criteria
}: Partial<ILayout> & {
  type?: LayoutType
}) => {
  const data = layouts
    .filter(propsEquals(criteria))
    .filter(({ types }) => !type || types.includes(type));

  if (!categoryId) {
    return data;
  }

  const sameCategory = data.filter(propEq(categoryId, 'categoryId'));

  if (sameCategory.length === 0) {
    return data;
  }

  return sameCategory;
}
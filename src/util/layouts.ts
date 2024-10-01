
import { layouts } from '@/data/layouts';
import { ILayout, LayoutOrientation, LayoutType } from "@/types/layouts";
import { propsEquals } from './criteria';

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: LayoutOrientation) => layouts.filter(({ orientation }) => orientation === layoutType);

export const getLayouts = ({
  type,
  ...criteria
}: Partial<ILayout> & {
  type?: LayoutType
}) => layouts
  .filter(propsEquals(criteria))
  .filter(({ types }) => !type || types.includes(type))
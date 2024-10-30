
import { layoutCategories, layouts } from '@/data/layouts';
import { ILayout, ILayoutCriteria, LayoutOrientation, LayoutType } from "@/types/layouts";
import { propsEquals } from '../../util/criteria';
import { isNil, propEq, reject } from 'ramda';

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: LayoutOrientation) => layouts.filter(({ orientation }) => orientation === layoutType);


type GetLayoutsOptions = {
  criteria: ILayoutCriteria,
  source?: ILayout[]
}

export const typeIncludes = (type?: LayoutType) => 
  ({ types }: ILayout) => !type || types.includes(type);

export const getLayouts = ({
  criteria,
  source = layouts
}: GetLayoutsOptions) => {
  const {
    type,
    ...restCriteria
  } = criteria;

  const safeCriteria = reject(isNil, restCriteria);

  return source
    .filter(propsEquals(safeCriteria))
    .filter(typeIncludes(type));
}

export const getCategoryById = (id: string) => {
  return layoutCategories.find(propEq(id, 'id'));
}
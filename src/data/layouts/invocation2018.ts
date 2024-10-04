import { ILayoutCategory, LayoutOrientation, LayoutType } from '@/types/layouts';
import { classicLayoutCategory, common, horizontal } from './classic';

export const invocation2018Layouts = [
  {
    ...common,
    ...horizontal,
    id: "invocation2018",
    categoryId: "invocation2018",
    title: "Invocation 2018",
    types: [LayoutType.PLAYER, LayoutType.INVESTIGATOR],
    orientation: LayoutOrientation.HORIZONTAL,
    color: true
  },
]

export const invocation2018LayoutCategory: ILayoutCategory = {
  ...classicLayoutCategory,
  id: "invocation2018",
  name: "Invocation 2018",
  info: "Invocation 2018 Event Promo Dividers"
}
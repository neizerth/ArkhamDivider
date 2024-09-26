import { LayoutOrientation, LayoutType } from '@/types/layouts';
import { common, horizontal } from './classic';

export const invocationLayouts = [
  {
    ...common,
    ...horizontal,
    id: "invocation2018",
    title: "Invocation 2018",
    types: [LayoutType.PLAYER, LayoutType.INVESTIGATOR],
    orientation: LayoutOrientation.HORIZONTAL,
    color: true
  },
]
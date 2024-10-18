import { ILayout, ILayoutCategory } from "@/types/layouts";

import { classicLayouts, classicLayoutCategory } from "./classic";
import { invocation2018Layouts, invocation2018LayoutCategory } from "./invocation2018";
import { sarnetskyLayouts, sarnetskyLayoutCategory } from "./sarnetsky";
import { arkhamDecoCategory, arkhamDecoLayouts } from "./arkham-deco";

export const layouts: ILayout[] = [
  ...classicLayouts,
  ...invocation2018Layouts,
  ...sarnetskyLayouts,
  ...arkhamDecoLayouts
]

export const layoutCategories: ILayoutCategory[] = [
  classicLayoutCategory,
  invocation2018LayoutCategory,
  sarnetskyLayoutCategory,
  arkhamDecoCategory
] 
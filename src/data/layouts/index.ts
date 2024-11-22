import { ILayout, ILayoutCategory } from "@/types/layouts";

import { classicLayouts, classicLayoutCategory } from "./classic";
import { invocation2018Layouts, invocation2018LayoutCategory } from "./invocation2018";
import { sarnetskyLayouts, sarnetskyLayoutCategory } from "./sarnetsky";
import { arkhamDecoCategory, arkhamDecoLayouts } from "./arkham-deco";
import { arkhamStarter3mmLayout, arkhamStarter3mmLayoutCategory } from "./3mm";
import { arkhamesqueCategory, arkhamesqueClassicLayouts } from "./arkhamesque-classic";

export const layouts: ILayout[] = [
  ...classicLayouts,
  ...invocation2018Layouts,
  ...sarnetskyLayouts,
  ...arkhamDecoLayouts,
  arkhamStarter3mmLayout,
  ...arkhamesqueClassicLayouts
]

export const layoutCategories: ILayoutCategory[] = [
  arkhamesqueCategory,
  classicLayoutCategory,
  invocation2018LayoutCategory,
  sarnetskyLayoutCategory,
  arkhamDecoCategory,
  arkhamStarter3mmLayoutCategory,
] 
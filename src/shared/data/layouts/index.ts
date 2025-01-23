import { ILayout, ILayoutCategory } from "@/shared/types/layouts";

import { classicLayouts, classicLayoutCategory } from "./classic";
import { invocation2018Layouts, invocation2018LayoutCategory } from "./invocation2018";
import { sarnetskyLayouts, sarnetskyLayoutCategory } from "./sarnetsky";
import { arkhamDecoCategory, arkhamDecoLayouts } from "./arkham-deco";
import { arkhamStarter3mmLayout, arkhamStarter3mmLayoutCategory } from "./3mm";
import { arkhamesqueCategory, arkhamesqueClassicLayouts } from "./arkhamesque";
import { vintageLayouts, vintageLayoutCategory } from "./vintage";

export const layouts: ILayout[] = [
  ...classicLayouts,
  ...invocation2018Layouts,
  ...sarnetskyLayouts,
  ...arkhamDecoLayouts,
  ...arkhamesqueClassicLayouts,
  ...vintageLayouts,
  arkhamStarter3mmLayout,
]

export const layoutCategories: ILayoutCategory[] = [
  classicLayoutCategory,
  invocation2018LayoutCategory,
  arkhamesqueCategory,
  sarnetskyLayoutCategory,
  arkhamDecoCategory,
  arkhamStarter3mmLayoutCategory,
  vintageLayoutCategory
] 
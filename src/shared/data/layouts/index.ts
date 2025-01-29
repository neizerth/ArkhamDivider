import type { ILayout, ILayoutCategory } from "@/shared/model/types/layouts";

import { arkhamStarter3mmLayout, arkhamStarter3mmLayoutCategory } from "./3mm";
import { arkhamDecoCategory, arkhamDecoLayouts } from "./arkham-deco";
import { arkhamesqueCategory, arkhamesqueClassicLayouts } from "./arkhamesque";
import { classicLayoutCategory, classicLayouts } from "./classic";
import {
	invocation2018LayoutCategory,
	invocation2018Layouts,
} from "./invocation2018";
import { sarnetskyLayoutCategory, sarnetskyLayouts } from "./sarnetsky";
import { vintageLayoutCategory, vintageLayouts } from "./vintage";

export const layouts: ILayout[] = [
	...classicLayouts,
	...invocation2018Layouts,
	...sarnetskyLayouts,
	...arkhamDecoLayouts,
	...arkhamesqueClassicLayouts,
	...vintageLayouts,
	arkhamStarter3mmLayout,
];

export const layoutCategories: ILayoutCategory[] = [
	classicLayoutCategory,
	invocation2018LayoutCategory,
	arkhamesqueCategory,
	sarnetskyLayoutCategory,
	arkhamDecoCategory,
	arkhamStarter3mmLayoutCategory,
	vintageLayoutCategory,
];

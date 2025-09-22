import { ILayout, ILayoutCategory } from '@/shared/types/layouts';
import { arkhamStarter3mmLayout, arkhamStarter3mmLayoutCategory } from './3mm';
import { arkhamDecoCategory, arkhamDecoLayouts } from './arkham-deco';
import { arkhamesqueCategory, arkhamesqueClassicLayouts } from './arkhamesque';
import { classicLayoutCategory, classicLayouts } from './classic';
import { investigatorTokensLayout, investigatorTokensLayoutCategory } from './investigator-tokens';
import { invocation2018LayoutCategory, invocation2018Layouts } from './invocation2018';
import { sarnetskyLayoutCategory, sarnetskyLayouts } from './sarnetsky';
import { vintageLayoutCategory, vintageLayouts } from './vintage';
import { sarnetskyBandLayoutCategory, sarnetskyBandLayouts } from './sarnetsky-band';

export const layouts: ILayout[] = [
  ...classicLayouts,
  ...invocation2018Layouts,
  ...sarnetskyLayouts,
  ...arkhamDecoLayouts,
  ...arkhamesqueClassicLayouts,
  ...vintageLayouts,
  ...sarnetskyBandLayouts,
  arkhamStarter3mmLayout,
  investigatorTokensLayout,
];

export const layoutCategories: ILayoutCategory[] = [
  classicLayoutCategory,
  invocation2018LayoutCategory,
  arkhamesqueCategory,
  sarnetskyLayoutCategory,
  sarnetskyBandLayoutCategory,
  arkhamDecoCategory,
  arkhamStarter3mmLayoutCategory,
  vintageLayoutCategory,
  investigatorTokensLayoutCategory,
];

import { arkhamDecoCategory } from '@/shared/data/layouts/arkham-deco';
import { investigatorTokensLayoutCategory } from '@/shared/data/layouts/investigator-tokens';
import { vintageLayoutCategory } from '@/shared/data/layouts/vintage';
import { ArkhamDecoPDFGuides } from './layouts/ArkhamDecoPDFGuides';
import { InvestigatorTokensPDFGuides } from './layouts/InvestigatorTokensPDFGuides';
import { VintagePDFGuides } from './layouts/VintagePDFGuides';

export const COMPONENT_MAP = {
  [arkhamDecoCategory.id]: ArkhamDecoPDFGuides,
  [vintageLayoutCategory.id]: VintagePDFGuides,
  [investigatorTokensLayoutCategory.id]: InvestigatorTokensPDFGuides,
};

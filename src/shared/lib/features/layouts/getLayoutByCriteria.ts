import { omit } from 'ramda';
import { getLayouts } from '@/shared/lib/features/layouts/common';
import { ILayout, ILayoutCriteria, LayoutType } from '@/shared/types/layouts';
import { Nullable } from '@/shared/types/util';

export const getLayoutByCriteria = ({
  type,
  categoryId: currentCategoryId,
  layout: currentLayout,
  criteria: requiredCriteria,
}: {
  criteria: ILayoutCriteria;
  type?: LayoutType;
  categoryId: Nullable<string>;
  layout: ILayout;
}) => {
  const { orientation, color } = currentLayout;

  const categoryId = currentCategoryId || currentLayout.categoryId;

  const criteria = {
    categoryId,
    orientation,
    color,
    type,
    ...requiredCriteria,
  };

  const [layout] = getLayouts({ criteria });

  if (layout) {
    return layout;
  }

  if (currentCategoryId) {
    return;
  }

  const secondaryCriteria = omit(['categoryId'], criteria);

  const [secondaryLayout] = getLayouts({ criteria: secondaryCriteria });

  if (!secondaryLayout) {
    return;
  }

  return secondaryLayout;
};

import S from './LayoutFilter.module.scss';

import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCategoryId, selectLayout, selectType } from '@/store/features/layout/layout';
import { getCategoryById, getLayouts } from '@/util/layouts';
import { isNotNil, prop, uniq } from 'ramda';
import { layouts } from '@/data/layouts';
import { LayoutColorToggle } from '../LayoutColorToggle/LayoutColorToggle';
import { LayoutOrientationToggle } from '../LayoutOrientationToggle/LayoutOrientationToggle';
import { LayoutSelect } from '../LayoutSelect/LayoutSelect';
import { Icon } from '@/components/ui/Icon/Icon';
import { useAppNavigate } from '@/hooks/useAppNavigate';
import { LayoutCategorySelect } from '../LayoutCategorySelect/LayoutCategorySelect';

export const LayoutFilter = () => {
  const layout = useAppSelector(selectLayout);
  
  const {
    color,
    orientation,
  } = layout;

  const type = useAppSelector(selectType);
  const categoryId = useAppSelector(selectCategoryId);

  
  const colorLayouts = getLayouts({ 
    criteria: {
      categoryId,
      type,
      orientation
    }
  });

  const orientationLayouts = getLayouts({ 
    criteria: {
      categoryId,
      type,
      color
    }
  });

  const haveColor = uniq(
    colorLayouts
      .map(prop('color'))
      .filter(isNotNil)
  ).length > 1;

  const haveOrientation = uniq(
    orientationLayouts
      .map(prop('orientation'))
      .filter(isNotNil)
  ).length > 1;

  return (
    <div className={S.container}>
      <LayoutCategorySelect className={S.select}/>
      {categoryId && (
        <>
          {haveOrientation && (
            <LayoutOrientationToggle data={orientationLayouts}/>
          )}
          {haveColor && (
            <LayoutColorToggle data={colorLayouts}/>
          )}
        </>
      )}
    </div>
  );
}
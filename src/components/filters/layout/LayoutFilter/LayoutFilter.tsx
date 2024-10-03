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

export const LayoutFilter = () => {
  const layout = useAppSelector(selectLayout);
  
  const {
    color,
    orientation,
  } = layout;

  const type = useAppSelector(selectType);
  const categoryId = useAppSelector(selectCategoryId);
  const navigate = useAppNavigate();

  const category = categoryId && getCategoryById(categoryId);
  
  const categoryLayouts = getLayouts({ 
    criteria: {
      categoryId,
      type,
      orientation,
      color
    }
  });
  
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

  const unsetCategory = () => {
    navigate({
      categoryId: void 0
    })
  }
    
  return (
    <div className={S.container}>
      {haveColor && (
        <LayoutColorToggle data={colorLayouts}/>
      )}
      {haveOrientation && (
        <LayoutOrientationToggle data={orientationLayouts}/>
      )}

      {!category && categoryLayouts.length > 1 && (
        <LayoutSelect 
          className={S.select}
          data={categoryLayouts}
        />
      )}
      {category && (
        <div className={S.category} onClick={unsetCategory}>
          {category.name}
          <Icon icon='dismiss'/>
        </div>
      )}
    </div>
  );
}
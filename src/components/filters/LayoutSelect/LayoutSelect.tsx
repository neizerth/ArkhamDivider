import Select from 'react-select';
import classNames from 'classnames';

import S from './LayoutSelect.module.scss';

import icon from './images/change-orientation.svg';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout, selectOrientation, selectType, setLayout, setOrientation } from '@/store/features/layout/layout';
import { LayoutOrientation } from "@/types/layouts";
import { getLayouts } from '@/util/layouts';
import { Color } from '@/components';
import { selectColor, setColor } from '@/store/features/layout/layout';

export const LayoutSelect = () => {
  const dispatch = useAppDispatch();
  const LayoutFilter = useAppSelector(selectOrientation);
  const layout = useAppSelector(selectLayout);
  const useColor = useAppSelector(selectColor);
  const type = useAppSelector(selectType);

  const isVertical = LayoutFilter === LayoutOrientation.VERTICAL;

  const iconClassName = classNames(
    S.icon,
    isVertical && S.icon_vertical
  );


  const toggleType = () => {
    const nextType = LayoutFilter === LayoutOrientation.HORIZONTAL ? 
      LayoutOrientation.VERTICAL : 
      LayoutOrientation.HORIZONTAL;
    
    const [firstLayout] = getLayouts({
      color: useColor,
      orientation: nextType,
      type
    })
    dispatch(setOrientation(nextType));
    dispatch(setLayout(firstLayout));
  };

  const criteria = {
    color: useColor,
    orientation: layout.orientation,
    type
  }

  const options = getLayouts(criteria)
    .map(({ title, id }) => ({
      label: title,
      value: id
    }));
    
  const value = layout ? options.find(({ value }) => value === layout.id) : null;

  const changeLayoutFilter = (id: string) => {
    const [nextLayout] = getLayouts({
      id,
      orientation: layout.orientation
    })

    if (!nextLayout) {
      return;
    }

    dispatch(setLayout(nextLayout));
  }

  const toggleColor = () => {
    const nextColor = !useColor;

    const criteria = {
      color: nextColor,
      orientation: layout?.orientation,
      type
    }

    const [firstLayout] = getLayouts(criteria)
    dispatch(setColor(nextColor));
    dispatch(setLayout(firstLayout));
  };

  return (
    <div className={S.container}>
      <Color className={S.color} color={useColor ? 'rgb(225 173 36)' : 'black'} onClick={toggleColor}/>
      <img className={iconClassName} src={icon} alt="Change Type" onClick={toggleType}/>
      {options.length > 1 && (
        <Select 
          className={S.select} 
          value={value} 
          options={options}
          onChange={item => item && changeLayoutFilter(item.value)}
        />
      )}
    </div>
  );
}
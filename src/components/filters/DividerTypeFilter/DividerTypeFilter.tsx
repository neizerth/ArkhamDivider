import Select from 'react-select';
import classNames from 'classnames';

import S from './DividerTypeFilter.module.scss';

import icon from './images/change-orientation.svg';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout, selectType, setLayout, setType } from '@/store/features/layout/layout';
import { IDividerType } from '@/types/dividers';
import layouts from '@/data/layouts.json';
import { getLayoutById, getLayoutsByType } from '@/util/layouts';

export type DividerTypeFilterProps = {

}

export const DividerTypeFilter = ({}: DividerTypeFilterProps) => {
  const dispatch = useAppDispatch();
  const dividerType = useAppSelector(selectType);
  const layout = useAppSelector(selectLayout);
  const isVertical = dividerType === IDividerType.VERTICAL;

  const iconClassName = classNames(
    S.icon,
    isVertical && S.icon_vertical
  );

  const toggleType = () => {
    const nextType = dividerType === IDividerType.HORIZONTAL ? 
      IDividerType.VERTICAL : 
      IDividerType.HORIZONTAL;
    
    const [firstLayout] = getLayoutsByType(nextType);
    dispatch(setType(nextType));
    dispatch(setLayout(firstLayout));
  };

  const options = getLayoutsByType(dividerType)
    .map(({ title, id }) => ({
      label: title,
      value: id
    }));

  const value = layout ? options.find(({ value }) => value === layout.id) : null;

  const changeDividerType = (id: string) => {
    const layout = getLayoutById(id);

    dispatch(setLayout(layout));
  }

  return (
    <div className={S.container}>
      <img className={iconClassName} src={icon.src} alt="Change Type" onClick={toggleType}/>
      <Select 
        className={S.select} 
        placeholder="Select type..." 
        value={value} 
        options={options}
        onChange={item => item && changeDividerType(item.value)}
      />
    </div>
  );
}
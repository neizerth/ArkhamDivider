import Select from 'react-select';

import S from './LayoutSelect.module.scss';

import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import classNames from 'classnames';
import { PropsWithClassName } from '@/types/util';
import { ILayout } from '@/types/layouts';
import { useAppNavigate } from '@/hooks/useAppNavigate';
import { propEq } from 'ramda';

export type LayoutSelectProps = PropsWithClassName & {
  data: ILayout[]
}

export const LayoutSelect = ({
  className,
  data
}: LayoutSelectProps) => {
  const navigate = useAppNavigate();
  const layout = useAppSelector(selectLayout);

  const options = data
    .map(({ title, id }) => ({
      label: title,
      value: id
    }));
    
  const value = layout ? options.find(
    ({ value }) => value === layout.id
  ) : null;

  const setLayoutId = (id: string) => {
    const layout = data.find(propEq(id, 'id'));
    navigate({
      layout
    });
  }

  const containerClassName = classNames(
    className,
    S.container,
  )

  return (
    <Select 
      className={containerClassName} 
      value={value} 
      options={options}
      onChange={item => item && setLayoutId(item.value)}
    />
  );
}
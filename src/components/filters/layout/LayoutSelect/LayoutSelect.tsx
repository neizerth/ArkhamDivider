import classNames from 'classnames';
import { propEq } from 'ramda';
import Select from 'react-select';
import { useAppNavigate } from '@/shared/lib/hooks/useAppNavigate';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { ILayout } from '@/shared/types/layouts';
import { PropsWithClassName } from '@/shared/types/util';
import S from './LayoutSelect.module.scss';

export type LayoutSelectProps = PropsWithClassName & {
  data: ILayout[];
};

export const LayoutSelect = ({ className, data }: LayoutSelectProps) => {
  const navigate = useAppNavigate();
  const layout = useAppSelector(selectLayout);

  const options = data.map(({ title, id }) => ({
    label: title,
    value: id,
  }));

  const value = layout ? options.find(({ value }) => value === layout.id) : null;

  const setLayoutId = (id: string) => {
    const layout = data.find(propEq(id, 'id'));
    navigate({
      layout,
    });
  };

  const containerClassName = classNames(className, S.container);

  return (
    <Select
      className={containerClassName}
      value={value}
      options={options}
      onChange={(item: any) => item && setLayoutId(item.value)}
    />
  );
};

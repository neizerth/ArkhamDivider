import Select from 'react-select';
import { useAppNavigate } from '@/hooks/useAppNavigate';
import S from './LayoutCategorySelect.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCategoryId } from '@/store/features/layout/layout';
import { layoutCategories } from '@/data/layouts';
import classNames from 'classnames';
import { PropsWithClassName } from '@/types/util';
import { propEq } from 'ramda';
import { getLayouts } from '@/util/layouts';

export type LayoutCategorySelectProps = PropsWithClassName & {
  
}

export const LayoutCategorySelect = ({
  className
}: LayoutCategorySelectProps) => {
  const navigate = useAppNavigate();
  const categoryId = useAppSelector(selectCategoryId);

  const options = layoutCategories
    .filter(({ unlisted, id }) => !unlisted || id === categoryId)
    .map(({ name, id }) => ({
      label: name,
      value: id
    }));

  const value = options.find(propEq(categoryId, 'value'));

  const setCategoryId = (categoryId: string) => {
    const [layout] = getLayouts({
      criteria: { categoryId }
    })
    navigate({
      categoryId,
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
      options={options}
      value={value} 
      onChange={item => item && setCategoryId(item.value)}
    />
  );
}
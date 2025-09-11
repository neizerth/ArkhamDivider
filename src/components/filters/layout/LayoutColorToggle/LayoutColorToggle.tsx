import classNames from 'classnames';
import { Color } from '@/components';
import { getLayouts } from '@/shared/lib/features/layouts/common';
import { useAppNavigate } from '@/shared/lib/hooks/useAppNavigate';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { ILayout } from '@/shared/types/layouts';
import { PropsWithClassName } from '@/shared/types/util';
import S from './LayoutColorToggle.module.scss';

export type LayoutColorToggleProps = PropsWithClassName & {
  data: ILayout[];
};

export const LayoutColorToggle = ({ className, data }: LayoutColorToggleProps) => {
  const layout = useAppSelector(selectLayout);

  const navigate = useAppNavigate();

  const { color } = layout;

  const toggleColor = () => {
    const nextColor = !color;

    const criteria = {
      color: nextColor,
    };

    const [firstLayout] = getLayouts({
      criteria,
      source: data,
    });

    navigate({
      layout: firstLayout,
    });
  };

  const containerClassName = classNames(S.container, className);

  return (
    <Color
      className={containerClassName}
      color={color ? 'rgb(225 173 36)' : 'black'}
      onClick={toggleColor}
    />
  );
};

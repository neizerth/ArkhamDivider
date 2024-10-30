import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LayoutColorToggle.module.scss';
import { selectLayout } from '@/store/features/layout/layout';
import { PropsWithClassName } from '@/types/util';
import { Color } from '@/components';
import { getLayouts } from '@/features/layouts/common';
import classNames from 'classnames';
import { useAppNavigate } from '@/hooks/useAppNavigate';
import { ILayout } from '@/types/layouts';

export type LayoutColorToggleProps = PropsWithClassName & {
  data: ILayout[]
}

export const LayoutColorToggle = ({
  className,
  data
}: LayoutColorToggleProps) => {
  const layout = useAppSelector(selectLayout);

  const navigate = useAppNavigate();

  const { color } = layout;

  const toggleColor = () => {
    const nextColor = !color;

    const criteria = {
      color: nextColor
    }

    const [firstLayout] = getLayouts({
      criteria,
      source: data
    });

    navigate({
      layout: firstLayout
    })
  };

  const containerClassName = classNames(
    S.container,
    className
  )

  return (
    <>
      <Color
        className={containerClassName} 
        color={color ? 'rgb(225 173 36)' : 'black'} 
        onClick={toggleColor}
      />
    </>
  );
}
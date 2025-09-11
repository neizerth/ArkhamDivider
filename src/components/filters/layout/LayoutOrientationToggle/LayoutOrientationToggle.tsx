import classNames from 'classnames';
import { getLayouts } from '@/shared/lib/features/layouts/common';
import { useAppNavigate } from '@/shared/lib/hooks/useAppNavigate';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { ILayout, LayoutOrientation } from '@/shared/types/layouts';
import { PropsWithClassName } from '@/shared/types/util';
import icon from './images/change-orientation.svg';
import S from './LayoutOrientationToggle.module.scss';

export type LayoutOrientationToggleProps = PropsWithClassName & {
  data: ILayout[];
};

export const LayoutOrientationToggle = ({ className, data }: LayoutOrientationToggleProps) => {
  const navigate = useAppNavigate();
  const { orientation } = useAppSelector(selectLayout);

  const isVertical = orientation === LayoutOrientation.VERTICAL;

  const containerClassName = classNames(S.container, className, isVertical && S.vertical);

  const toggleOrientation = () => {
    const nextOrientation =
      orientation === LayoutOrientation.HORIZONTAL
        ? LayoutOrientation.VERTICAL
        : LayoutOrientation.HORIZONTAL;

    const criteria = {
      orientation: nextOrientation,
    };

    const [firstLayout] = getLayouts({
      criteria,
      source: data,
    });

    navigate({
      layout: firstLayout,
    });
  };

  return (
    <img className={containerClassName} src={icon} alt='Change Type' onClick={toggleOrientation} />
  );
};

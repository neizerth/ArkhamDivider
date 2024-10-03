import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LayoutOrientationToggle.module.scss';
import icon from './images/change-orientation.svg'; 
import { selectLayout } from '@/store/features/layout/layout';
import { ILayout, LayoutOrientation } from '@/types/layouts';
import { getLayouts } from '@/util/layouts';
import classNames from 'classnames';
import { PropsWithClassName } from '@/types/util';
import { useAppNavigate } from '@/hooks/useAppNavigate';


export type LayoutOrientationToggleProps = PropsWithClassName & {
  data: ILayout[]
}

export const LayoutOrientationToggle = ({
  className,
  data
}: LayoutOrientationToggleProps) => {

  const navigate = useAppNavigate();
  const { orientation } = useAppSelector(selectLayout);
  
  const isVertical = orientation === LayoutOrientation.VERTICAL;


  const containerClassName = classNames(
    S.container,
    className,
    isVertical && S.vertical
  );

  const toggleOrientation = () => {
    const nextOrientation = orientation === LayoutOrientation.HORIZONTAL ? 
      LayoutOrientation.VERTICAL : 
      LayoutOrientation.HORIZONTAL;

    const criteria = {
      orientation: nextOrientation,
    }
    
    const [firstLayout] = getLayouts({
      criteria,
      source: data
    })

    navigate({
      layoutId: firstLayout.id
    });
  };

  return (
    <img 
      className={containerClassName} 
      src={icon} 
      alt="Change Type" 
      onClick={toggleOrientation}
    />
  );
}
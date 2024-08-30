import { PropsWithChildren } from 'react';
import S from './GuidedItem.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type GuidedItemProps = PropsWithChildren & PropsWithClassName & {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
}

export const GuidedItem = ({ 
  children, 
  className,
  topLeft = true,
  topRight = true,
  bottomLeft = true,
  bottomRight = true 
}: GuidedItemProps) => {
  return (
    <div className={classNames(S.container, className)}>
      
      {topLeft && <div className={classNames(S.guide, S.guide_tl)}/>}
      {topRight && <div className={classNames(S.guide, S.guide_tr)}/>}
      {bottomLeft && <div className={classNames(S.guide, S.guide_bl)}/>}
      {bottomRight && <div className={classNames(S.guide, S.guide_br)}/>}

      {children}
    </div>
  );
}
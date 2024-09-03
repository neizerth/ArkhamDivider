import { PropsWithChildren } from 'react';
import S from './GuidedItem.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { Guide } from '@/components';

export type GuidedItemProps = PropsWithChildren & PropsWithClassName & {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  contentClassName?: string;
}

export const GuidedItem = ({ 
  children, 
  className,
  contentClassName,
  topLeft = true,
  topRight = true,
  bottomLeft = true,
  bottomRight = true
}: GuidedItemProps) => {
  return (
    <div className={classNames(S.container, className)}>
      
      {topLeft && <Guide className={classNames(S.guide, S.guide_topLeft)}/>}
      {topRight && <Guide className={classNames(S.guide, S.guide_topRight)}/>}
      {bottomLeft && <Guide className={classNames(S.guide, S.guide_bottomLeft)}/>}
      {bottomRight && <Guide className={classNames(S.guide, S.guide_bottomRight)}/>}

      <div className={classNames(S.content, contentClassName)}>
        {children}
      </div>
    </div>
  );
}
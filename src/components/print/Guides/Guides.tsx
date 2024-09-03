import S from './Guides.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { Guide } from '@/components';

export type GuidesProps = PropsWithClassName & {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  contentClassName?: string;
}

export const Guides = ({ 
  className,
  topLeft = true,
  topRight = true,
  bottomLeft = true,
  bottomRight = true
}: GuidesProps) => {
  return (
    <div className={classNames(S.container, className)}>
      {topLeft && <Guide className={classNames(S.guide, S.guide_topLeft)}/>}
      {topRight && <Guide className={classNames(S.guide, S.guide_topRight)}/>}
      {bottomLeft && <Guide className={classNames(S.guide, S.guide_bottomLeft)}/>}
      {bottomRight && <Guide className={classNames(S.guide, S.guide_bottomRight)}/>}
    </div>
  );
}
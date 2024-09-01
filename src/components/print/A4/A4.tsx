import { PropsWithClassName } from '@/types/util';
import S from './A4.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

export type A4Props = PropsWithClassName & PropsWithChildren & {
  landscape?: boolean;
}

export const A4 = ({ landscape = false, className, children }: A4Props) => {
  
  const classList = classNames(
    S.container, 
    className,
    landscape && S.landscape
  );
  return (
    <div className={classList}>
      {children}
    </div>
  );
}
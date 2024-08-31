import { PropsWithClassName } from '@/types/util';
import S from './A4.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';

export type A4Props = PropsWithClassName & PropsWithChildren & {

}

export const A4 = ({ className, children }: A4Props) => {
  return (
    <div className={classNames(S.container, className)}>
      {children}
    </div>
  );
}
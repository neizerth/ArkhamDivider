import { PropsWithClassName } from '@/types/util';
import S from './A4.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { PageSide } from '@/types/print';

export type A4Props = PropsWithClassName & PropsWithChildren & {
  side: PageSide;
  showPageSide?: boolean;
  pageNumber: number;
  pagesTotal: number; 
  landscape?: boolean;
}

export const A4 = ({ 
  landscape = false, 
  showPageSide = false,
  pageNumber,
  pagesTotal,
  className, 
  children,
  side
}: A4Props) => {
  
  const classList = classNames(
    S.container, 
    S[`side_${side}`],
    className,
    landscape ? S.landscape : S.portrait
  );
  return (
    <div className={classList}>
      {children}

      <div className={S.counter}>
        {pageNumber} 
        {showPageSide && (side === PageSide.FRONT ? 'A' : 'B')} / {pagesTotal}
      </div>
    </div>
  );
}
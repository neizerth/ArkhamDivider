import { PropsWithClassName } from '@/types/util';
import S from './A4.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { PageOrientation, PageSide } from '@/types/print';
import { PageCredits } from '@/components/containers/PageCredits/PageCredits';

export type A4Props = PropsWithClassName & PropsWithChildren & {
  side: PageSide;
  showPageSide?: boolean;
  pageNumber: number;
  pagesTotal: number; 
  orientation: PageOrientation;
  isLast: boolean;
}

export const A4 = ({ 
  orientation, 
  showPageSide = false,
  isLast = false,
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
    S[orientation]
  );
  return (
    <div className={classList}>
      {children}

      <div className={S.counter}>
        {pageNumber} 
        {showPageSide && (side === PageSide.FRONT ? 'A' : 'B')} / {pagesTotal}
      </div>
      {isLast && (
        <div className={S.credits}>
          <PageCredits/>
        </div>
      )}
    </div>
  );
}
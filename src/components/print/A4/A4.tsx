import { PropsWithClassName } from '@/types/util';
import S from './A4.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { PageOrientation, PageSide } from '@/types/print';
import { PageCredits } from '@/components/containers/PageCredits/PageCredits';
import { detect } from 'detect-browser'

export type A4Props = PropsWithClassName & PropsWithChildren & {
  side: PageSide;
  showPageSide?: boolean;
  pageNumber: number;
  pagesTotal: number; 
  orientation: PageOrientation;
  isLast: boolean;
  showCredits?: boolean;
}

export const A4 = ({ 
  orientation, 
  showPageSide = false,
  isLast = false,
  showCredits = true,
  pageNumber,
  pagesTotal,
  className, 
  children,
  side
}: A4Props) => {

  const browser = detect();
  const classList = classNames(
    S.container, 
    browser && [
      S[`browser_${browser.name}`],
      S[`os_${browser.os}`],
      S[`version_${browser.version}`]
    ],
    S[`side_${side}`],
    className,
    S[orientation],
    isLast ? S.last : S.page,
    showCredits && isLast && S.withCredits
  );

  return (
    <div className={classList}>
      {children}

      <div className={S.counter}>
        {pageNumber} 
        {showPageSide && (side === PageSide.FRONT ? 'A' : 'B')} / {pagesTotal}
      </div>
      {showCredits && isLast && (
        <div className={S.credits}>
          <PageCredits/>
        </div>
      )}
    </div>
  );
}
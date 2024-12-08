import { PropsWithClassName } from '@/types/util';
import S from './Page.module.scss';
import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { PageOrientation, PageSide, PageSize } from '@/types/print';
import { PageCredits } from '@/components/containers/PageCredits/PageCredits';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { selectBleed, selectPageOrientation, selectPageSizeType } from '@/store/features/print/print';
import { Container } from './components';

export type PageProps = PropsWithClassName & PropsWithChildren & {
  side: PageSide;
  showPageSide?: boolean;
  pageNumber: number;
  pagesTotal: number; 
  isLast: boolean;
  rows: number;
}

const CREDITS_HEIGHT = 20;
const COUNTER_SIZE = 10;

export const Page = ({ 
  showPageSide = false,
  isLast = false,
  pageNumber,
  pagesTotal,
  rows,
  className, 
  children,
  side
}: PageProps) => {
  const pageSizeType = useAppSelector(selectPageSizeType);
  const pageOrientation = useAppSelector(selectPageOrientation);
  const bleed = useAppSelector(selectBleed);
  const layout = useAppSelector(selectLayout);
  const { width, height } = bleed ? layout.bleed : layout;
  const size = PageSize[pageSizeType];

  const [pageWidth, pageHeight] = pageOrientation === PageOrientation.PORTRAIT ? 
    [size.width, size.height] : [size.height, size.width];
  
  const freeHeight = pageHeight - rows * height;
  const freeWidth = pageWidth % width;

  console.log({
    freeWidth,
    width,
    pageWidth
  })

  const showCredits = freeHeight >= CREDITS_HEIGHT;
  const rotateCounter = freeWidth / 2 < COUNTER_SIZE && freeHeight / 2 < COUNTER_SIZE;

  const classList = classNames(
    S.container, 
    S[`side_${side}`],
    className,
    isLast ? S.last : S.page,
    showCredits && isLast && S.withCredits
  );

  return (
    <Container
      className={classList}
      $portrait={pageOrientation === PageOrientation.PORTRAIT}
      $size={size}
    >
      {children}

      <div 
        className={classNames(
          S.counter,
          rotateCounter && S.counter_rotated
        )}
      >
        {pageNumber} 
        {showPageSide && (side === PageSide.FRONT ? 'A' : 'B')} / {pagesTotal}
      </div>
      {showCredits && isLast && (
        <div className={S.credits}>
          <PageCredits/>
        </div>
      )}
    </Container>
  );
}
import classNames from 'classnames';
import { prop } from 'ramda';
import { DividerMemo, Page, Row, ZoomView } from '@/components';
import { splitIntoPages } from '@/shared/lib/features/print';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectDividers } from '@/shared/store/features/dividers/dividers';
import { selectZoom } from '@/shared/store/features/layout/layout';
import {
  selectDoubleSided,
  selectItemsPerPage,
  selectRowsPerPage,
} from '@/shared/store/features/print/print';
import S from './Layout.module.scss';

export const Layout = () => {
  const dividers = useAppSelector(selectDividers);
  const doubleSidedPrint = useAppSelector(selectDoubleSided);
  const zoom = useAppSelector(selectZoom);
  const groupSize = useAppSelector(selectItemsPerPage);
  const rowSize = useAppSelector(selectRowsPerPage);

  const pages = splitIntoPages(dividers, {
    doubleSidedPrint,
    groupSize,
    rowSize,
  });

  const pagesTotal = pages[pages.length - 1]?.pageNumber || 0;

  const ids = dividers.filter(({ backId }) => !backId).map(prop('id'));

  return (
    <div className={S.container}>
      <ZoomView zoom={zoom}>
        <div className={S.groups}>
          {pages.map(({ side, rows, pageNumber }, pageIndex) => (
            <Page
              className={S.page}
              side={side}
              showPageSide={doubleSidedPrint}
              pageNumber={pageNumber}
              pagesTotal={pagesTotal}
              isLast={pageNumber === pagesTotal}
              rows={rows.length}
              key={pageIndex}
            >
              <div className={S.group}>
                {rows.map((row, rowIndex) => (
                  <Row
                    gap={false}
                    className={classNames(S.row, S[`row_side_${side}`])}
                    key={rowIndex}
                  >
                    {row.map((divider) => (
                      <DividerMemo
                        {...divider}
                        index={ids.indexOf(divider.id)}
                        rowIndex={rowIndex + 1}
                        key={divider.id}
                      />
                    ))}
                  </Row>
                ))}
              </div>
            </Page>
          ))}
        </div>
      </ZoomView>
    </div>
  );
};

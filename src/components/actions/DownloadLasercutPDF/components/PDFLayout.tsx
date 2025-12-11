import { Document, Image, Page, StyleSheet, View } from '@react-pdf/renderer';
import { splitIntoPages } from '@/shared/lib/features/print';
import { uniqId } from '@/shared/lib/features/util/common';
import { toPrintSize } from '@/shared/lib/features/util/units';
import { IDivider } from '@/shared/types/dividers';
import { IEqualLayoutBleed, ILayout } from '@/shared/types/layouts';
import { PageOrientation, PageSide, PageSizeType, PrintPageSize } from '@/shared/types/print';
import { PDFPageGuides as PageGuides } from './guides/PDFPageGuides';
import { PDFRow as Row } from './PDFRow';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    position: 'relative',
    zIndex: -1,
  },
  guides: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
});

export type PDFLayoutOptions = {
  data: string[];
  doubleSidedPrint: boolean;
  groupSize: number;
  rowSize: number;
  pageSizeType: PageSizeType;
  pageOrientation: PageOrientation;
  bleed: IEqualLayoutBleed;
  cornerRadius: boolean;
  dividers: IDivider[];
  layout: ILayout;
};

export const PDFLayout = ({
  data,
  doubleSidedPrint,
  groupSize,
  rowSize,
  pageSizeType,
  bleed,
  cornerRadius,
  dividers,
  layout,
  pageOrientation,
}: PDFLayoutOptions) => {
  const items = data.map((src) => ({
    id: uniqId(),
    src,
  }));

  const pages = splitIntoPages(items, {
    doubleSidedPrint,
    groupSize,
    rowSize,
  });

  const basePageBox = PrintPageSize[pageSizeType];

  console.log('pageOrientation', pageOrientation);

  const pageSize =
    pageOrientation === PageOrientation.PORTRAIT
      ? basePageBox
      : {
          width: basePageBox.height,
          height: basePageBox.width,
        };

  const size: [number, number] = [pageSize.width, pageSize.height];

  const dividerWithBleedStyle = {
    width: Math.round(toPrintSize(bleed.width)),
    height: Math.round(toPrintSize(bleed.height)),
  };

  const guideArea = {
    ...dividerWithBleedStyle,
    bleedSize: Math.round(toPrintSize(bleed.size)),
  };

  console.log({
    pageSize,
    size,
    layout,
    guideArea,
    bleed,
  });

  return (
    <Document>
      {pages.map(({ rows, side }, pageIndex) => (
        <Page key={pageIndex} size={size} style={[styles.page]} wrap={false}>
          <PageGuides
            area={guideArea}
            rows={rows}
            pageSize={pageSize}
            style={styles.guides}
            cornerRadius={cornerRadius}
            dividers={dividers}
            layout={layout}
            back={side === PageSide.BACK}
          />
          <View
            style={{
              width: pageSize.width,
              height: pageSize.height,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <View style={styles.content}>
              {rows.map((row, rowIndex) => (
                <Row key={rowIndex} back={side === PageSide.BACK}>
                  {row.map((divider) => (
                    <Image key={divider.id} src={divider.src} style={dividerWithBleedStyle} />
                  ))}
                </Row>
              ))}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

import { splitIntoPages } from "@/features/print";
import { Document, Image, Page, StyleSheet, View } from '@react-pdf/renderer';
import { uniqId } from "@/util/common";
import { PageOrientation, PageSizeType, PrintPageSize } from "@/types/print";
import { IEqualLayoutBleed } from "@/types/layouts";
import { toPrintSize } from "@/util/units";
import { PDFRow as Row } from "./PDFRow";
import { PDFPageGuides as PageGuides } from "./guides/PDFPageGuides";

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    position: 'relative',
    zIndex: -1
  },
  guides: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  }
});

export type PDFLayoutOptions = {
  data: string[]
  doubleSidedPrint: boolean
  groupSize: number
  rowSize: number
  pageSizeType: PageSizeType
  pageOrientation: PageOrientation
  bleed: IEqualLayoutBleed
}

export const PDFLayout = ({
  data,
  doubleSidedPrint,
  groupSize,
  rowSize,
  pageSizeType,
  bleed
}: PDFLayoutOptions) => {

  const items = data.map(src => ({
    id: uniqId(),
    src
  }));

	const pages = splitIntoPages(items, {
		doubleSidedPrint,
		groupSize, 
		rowSize
	});

  const pageSize = PrintPageSize[pageSizeType];
  const size: [number, number] = [pageSize.width, pageSize.height];

  const dividerWithBleedStyle = {
    width: Math.round(toPrintSize(bleed.width)),
    height: Math.round(toPrintSize(bleed.height))
  }

  const guideArea = {
    ...dividerWithBleedStyle,
    bleedSize: Math.round(toPrintSize(bleed.size))
  }

  return (
    <Document>
      {pages.map(({ rows }, pageIndex) => (
        <Page 
          size={size}
          key={pageIndex}
          style={[styles.page]}
        >
          <PageGuides
            area={guideArea}
            rows={rows}
            pageSize={pageSize}
            style={styles.guides}
          />
          <View
            style={styles.content}
          >
            {rows.map((row, rowIndex) => (
              <Row
                key={rowIndex}
              >
                {row.map(divider => (
                  <Image
                    key={divider.id}
                    src={divider.src}
                    style={dividerWithBleedStyle}
                  />
                ))}
              </Row>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  )
}
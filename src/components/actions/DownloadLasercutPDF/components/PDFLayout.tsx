import { splitIntoPages } from "@/features/print";
import { Document, Image, Page, View, StyleSheet } from '@react-pdf/renderer';
import { uniqId } from "@/util/common";
import { PageOrientation, PageSizeType, PrintPageSize } from "@/types/print";
import { IEqualLayoutBleed } from "@/types/layouts";
import { toPrintSize } from "@/util/units";

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
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
  pageOrientation,
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
  const dividerSize = {
    width: toPrintSize(bleed.width),
    height: toPrintSize(bleed.height)
  }

  console.log({
    pageSize,
    dividerSize
  })

  return (
    <Document>
      {pages.map(({ rows }, pageIndex) => (
        <Page 
          size={[pageSize.width, pageSize.height]}
          orientation={pageOrientation}
          key={pageIndex}
          style={[styles.page, pageSize]}
        >
          {rows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={styles.row}
            >
              {row.map(divider => (
                <Image
                  key={divider.id}
                  src={divider.src}
                  style={dividerSize}
                />
              ))}
            </View>
          ))}
        </Page>
      ))}
    </Document>
  )
}
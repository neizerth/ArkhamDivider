import { splitIntoPages } from "@/features/print";
import { Document, Image, Page, View, StyleSheet, Styles, Svg } from '@react-pdf/renderer';
import { uniqId } from "@/util/common";
import { PageOrientation, PageSizeType, PrintPageSize } from "@/types/print";
import { IEqualLayoutBleed } from "@/types/layouts";
import { toPrintSize } from "@/util/units";
import { ValueOf } from "@/types/util";
import { Rect } from "react-konva";

const GUIDE_WIDTH = 1;

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
    zIndex: 1
  },
  cutPage: {
    position: 'absolute',
    zIndex: 2
  }
});

type Style = ValueOf<Styles>

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
  const dividerWithBleedStyle = {
    width: Math.round(toPrintSize(bleed.width)),
    height: Math.round(toPrintSize(bleed.height))
  }

  const bleedSize = Math.round(toPrintSize(bleed.size));
  
  const dividerStyle: Style = {
    width: dividerWithBleedStyle.width - bleedSize * 2,
    height: dividerWithBleedStyle.height - bleedSize * 2,
    margin: bleedSize - GUIDE_WIDTH
  }

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
                  style={dividerWithBleedStyle}
                />
              ))}
            </View>
          ))}
          <View
            style={[pageSize, styles.cutPage]}
          >
            {rows.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={styles.row}
              >
                <Svg>
                  {row.map(({ id }) => (
                    <Rect
                      key={id}
                      style={dividerStyle}
                      stroke={'black'}
                      strokeWidth={1}
                    />
                  ))}
                </Svg>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  )
}
import { IBox } from "@/types/units"
import { Svg, View, ViewProps } from "@react-pdf/renderer"
import { PDFGuideRow as Row } from "./PDFGuideRow"

export type PDFGuideArea = {
  width: number
  height: number
  bleedSize: number
}

export type PDFPageGuidesProps = ViewProps & {
  rows: unknown[][]
  pageSize: IBox
  area: PDFGuideArea
}

export const PDFPageGuides = ({
  rows,
  area,
  pageSize,
  style
}: PDFPageGuidesProps) => {  
  const colSize = Math.max(
    ...rows.map(({ length }) => length)
  );
  const rowSize = rows.length;

  return (
    <View
      style={style}
    >
      <Svg
        style={[pageSize]}
        preserveAspectRatio="none"
      >
        {rows.map((row, index) => (
          <Row 
            key={index}
            rowIndex={index}
            rowSize={rowSize}
            colSize={colSize}
            area={area}
            items={row}
            pageSize={pageSize}
          />
        ))}
      </Svg>
    </View>
  )
}
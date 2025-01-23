import { IBox } from "@/shared/types/units"
import { Svg, View, ViewProps } from "@react-pdf/renderer"
import { PDFGuideRow as Row } from "./PDFGuideRow"
import { IDivider } from "@/shared/types/dividers"
import { ILayout } from "@/shared/types/layouts"

export type PDFGuideArea = {
  width: number
  height: number
  bleedSize: number
}

export type PDFPageGuidesProps = ViewProps & {
  rows: unknown[][]
  pageSize: IBox
  area: PDFGuideArea
  cornerRadius: boolean
  dividers: IDivider[]
  layout: ILayout
}

export const PDFPageGuides = ({
  rows,
  style,
  ...props
}: PDFPageGuidesProps) => {
  const { pageSize } = props;  
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
            items={row}
            {...props}
          />
        ))}
      </Svg>
    </View>
  )
}
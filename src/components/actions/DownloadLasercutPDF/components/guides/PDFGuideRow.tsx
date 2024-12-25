import { IBox } from "@/types/units"
import { PDFGuideArea } from "./PDFPageGuides"
import { PDFGuideBox as GuideBox } from "./PDFGuideBox"

export const PDFGuideRow = ({
  rowIndex,
  area,
  items,
  pageSize,
  rowSize,
  colSize
}: {
  items: unknown[]
  area: PDFGuideArea
  rowIndex: number
  colSize: number
  rowSize: number
  pageSize: IBox
}) => {
  return (
    <>
      {items.map((_, columnIndex) => (
        <GuideBox
          key={columnIndex}
          rowIndex={rowIndex}
          rowSize={rowSize}
          colSize={colSize}
          colIndex={columnIndex}
          area={area}
          pageSize={pageSize}
        />
      ))}
    </>
  )
}
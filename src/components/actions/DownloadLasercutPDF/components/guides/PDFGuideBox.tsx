import { IBox } from "@/types/units"
import { Rect } from "@react-pdf/renderer"
import { PDFGuideArea } from "./PDFPageGuides"

export const PDFGuideBox = ({
  rowIndex,
  rowSize,
  colSize,
  colIndex,
  area,
  pageSize
}: {
  rowIndex: number
  rowSize: number
  colSize: number
  colIndex: number
  area: PDFGuideArea
  pageSize: IBox
}) => {

  const width = area.width - area.bleedSize * 2;
  const height = area.height - area.bleedSize * 2;

  const contentWidth = colSize * area.width;
  const contentHeight = rowSize * area.height;

  const relativeLeft = area.width * colIndex;
  const relativeTop = area.height * rowIndex;

  const left = (pageSize.width - contentWidth) / 2 + area.bleedSize + relativeLeft
  const top = (pageSize.height - contentHeight) / 2 + area.bleedSize + relativeTop;

  return (
    <Rect
      x={left}
      y={top}
      width={width}
      height={height}
      stroke="red"
      strokeWidth={1}
    />
  )
}

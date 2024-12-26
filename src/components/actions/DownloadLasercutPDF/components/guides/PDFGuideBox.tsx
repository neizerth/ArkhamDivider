import { IBox } from "@/types/units"
import { PDFGuideArea } from "./PDFPageGuides"
import { toPrintSize } from "@/util/units"
import { DEFAULT_CORNER_RADIUS } from "@/constants/print"
import { IDivider } from "@/types/dividers"
import { ILayout } from "@/types/layouts"
import { PDFDividerGuides } from "./PDFDividerGuides"
import { COMPONENT_MAP } from "./special"

const BLEED_GAP = toPrintSize(1); // 1mm extra space

export const PDFGuideBox = (props: {
  rowIndex: number
  rowSize: number
  colSize: number
  colIndex: number
  cornerRadius: boolean
  area: PDFGuideArea
  pageSize: IBox
  dividers: IDivider[]
  layout: ILayout
}) => {

  const {
    rowIndex,
    rowSize,
    colSize,
    colIndex,
    area,
    pageSize,
    cornerRadius,
    dividers,
    layout
  } = props;

  const bleedSize = area.bleedSize - BLEED_GAP;

  const index = rowIndex * colSize + colIndex;

  const width = area.width - bleedSize * 2;
  const height = area.height - bleedSize * 2;

  const contentWidth = colSize * area.width;
  const contentHeight = rowSize * area.height;

  const relativeLeft = area.width * colIndex;
  const relativeTop = area.height * rowIndex;

  const left = (pageSize.width - contentWidth) / 2 + bleedSize + relativeLeft
  const top = (pageSize.height - contentHeight) / 2 + bleedSize + relativeTop;

  const radius = cornerRadius ? toPrintSize(DEFAULT_CORNER_RADIUS) : 0;
  const divider = dividers[index];

  const { categoryId } = layout;

  const Component = categoryId in COMPONENT_MAP ? 
    COMPONENT_MAP[categoryId] : PDFDividerGuides;

  const componentProps = {
    x: left,
    y: top,
    width,
    height,
    radius,
    divider,
    dividers,
    layout
  }

  return (
    <Component
      {...componentProps}
    />
  )
}


import { DEFAULT_CORNER_RADIUS } from '@/shared/config/print';
import { toPrintSize } from '@/shared/lib/features/util/units';
import { IDivider } from '@/shared/types/dividers';
import { ILayout } from '@/shared/types/layouts';
import { IBox } from '@/shared/types/units';
import { BLEED_GAP } from '../../constants';
import { PDFDividerGuides } from './PDFDividerGuides';
import { PDFGuideArea } from './PDFPageGuides';
import { COMPONENT_MAP } from './special';

export const PDFGuideBox = (props: {
  rowIndex: number;
  rowSize: number;
  colSize: number;
  colIndex: number;
  cornerRadius: boolean;
  area: PDFGuideArea;
  pageSize: IBox;
  dividers: IDivider[];
  layout: ILayout;
}) => {
  const { rowIndex, rowSize, colSize, colIndex, area, pageSize, cornerRadius, dividers, layout } =
    props;

  const bleedGap = toPrintSize(BLEED_GAP);
  const { bleedSize } = area;

  const index = rowIndex * colSize + colIndex;

  const width = area.width - bleedSize * 2 + bleedGap * 2;
  const height = area.height - bleedSize * 2 + bleedGap * 2;

  const contentWidth = colSize * area.width;
  const contentHeight = rowSize * area.height;

  const relativeLeft = area.width * colIndex;
  const relativeTop = area.height * rowIndex;

  const left = (pageSize.width - contentWidth) / 2 + bleedSize + relativeLeft - bleedGap;
  const top = (pageSize.height - contentHeight) / 2 + bleedSize + relativeTop - bleedGap;

  const radius = cornerRadius ? toPrintSize(DEFAULT_CORNER_RADIUS) : 0;
  const divider = dividers[index];

  const { categoryId } = layout;

  const Component = categoryId in COMPONENT_MAP ? COMPONENT_MAP[categoryId] : PDFDividerGuides;

  const componentProps = {
    x: left,
    y: top,
    width,
    height,
    radius,
    divider,
    dividers,
    layout,
  };

  return <Component {...componentProps} />;
};

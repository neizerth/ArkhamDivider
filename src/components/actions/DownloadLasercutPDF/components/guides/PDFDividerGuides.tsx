import { Rect } from '@react-pdf/renderer';
import { IBox } from '@/shared/types/units';

export type PDFDividerGuidesProps = IBox & {
  x: number;
  y: number;
  radius: number;
};

export const PDFDividerGuides = ({ radius, ...props }: PDFDividerGuidesProps) => {
  return <Rect {...props} stroke='red' strokeWidth={1} rx={radius} ry={radius} />;
};

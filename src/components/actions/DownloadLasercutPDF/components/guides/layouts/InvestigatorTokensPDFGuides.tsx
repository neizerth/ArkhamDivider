import { Circle } from '@react-pdf/renderer';
import { IBox } from '@/shared/types/units';

export type PDFDividerGuidesProps = IBox & {
  x: number;
  y: number;
  width: number;
};

export const InvestigatorTokensPDFGuides = ({ width, x, y, ...props }: PDFDividerGuidesProps) => {
  console.log('InvestigatorTokensPDFGuides', { width, x, y, ...props });
  const radius = width / 2;
  const cx = x + radius;
  const cy = y + radius;

  return <Circle cx={cx} cy={cy} stroke='red' strokeWidth={1} r={radius} />;
};

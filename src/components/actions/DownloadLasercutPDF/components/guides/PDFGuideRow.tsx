import { IDivider } from '@/shared/types/dividers';
import { ILayout } from '@/shared/types/layouts';
import { IBox } from '@/shared/types/units';
import { PDFGuideBox as GuideBox } from './PDFGuideBox';
import { PDFGuideArea } from './PDFPageGuides';

export const PDFGuideRow = ({
  items,
  ...props
}: {
  items: unknown[];
  back?: boolean;
  area: PDFGuideArea;
  rowIndex: number;
  colSize: number;
  rowSize: number;
  cornerRadius: boolean;
  dividers: IDivider[];
  pageSize: IBox;
  layout: ILayout;
}) => {
  return (
    <>
      {items.map((_, columnIndex) => (
        <GuideBox {...props} key={columnIndex} colIndex={columnIndex} />
      ))}
    </>
  );
};

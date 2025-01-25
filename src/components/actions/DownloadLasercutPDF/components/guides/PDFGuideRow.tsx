import { IBox } from "@/shared/types/units";
import { PDFGuideArea } from "./PDFPageGuides";
import { PDFGuideBox as GuideBox } from "./PDFGuideBox";
import { IDivider } from "@/shared/types/dividers";
import { ILayout } from "@/shared/types/layouts";

export const PDFGuideRow = ({
	items,
	...props
}: {
	items: unknown[];
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

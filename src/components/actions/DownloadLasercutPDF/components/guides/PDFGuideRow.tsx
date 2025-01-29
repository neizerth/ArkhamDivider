import type { IDivider } from "@/shared/model/types/dividers";
import type { ILayout } from "@/shared/model/types/layouts";
import type { IBox } from "@/shared/model/types/units";
import { PDFGuideBox as GuideBox } from "./PDFGuideBox";
import type { PDFGuideArea } from "./PDFPageGuides";

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

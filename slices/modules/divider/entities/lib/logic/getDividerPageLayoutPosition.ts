import type { PageLayout } from "@/modules/print/shared/model";
import type { DividerWithRelations } from "../../../shared/model";

type Options = {
	layouts: PageLayout<DividerWithRelations>[];
	id: string;
};
export const getDividerPageLayoutPosition = ({ layouts, id }: Options) => {
	for (const [layoutIndex, layout] of layouts.entries()) {
		for (const [rowIndex, row] of layout.items.entries()) {
			for (const [colIndex, item] of row.items.entries()) {
				if (item.id === id) {
					return {
						layoutIndex,
						rowIndex,
						colIndex,
						isLastCol: colIndex === row.items.length - 1,
						isLastRow: rowIndex === layout.items.length - 1,
					};
				}
			}
		}
	}
	return;
};

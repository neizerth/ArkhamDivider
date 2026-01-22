import type { DividerLayout } from "@/modules/divider/shared/model";
import type { PageFormat } from "@/modules/print/shared/model";
import { getBoxGrid } from "@/shared/util/size";

type Options = {
	layout: DividerLayout;
	pageFormat: PageFormat;
};

export const getDividerLayoutGrid = ({ layout, pageFormat }: Options) => {
	const { size } = layout;
	const pageSize = pageFormat.size.mm;

	return getBoxGrid(pageSize, size);
};

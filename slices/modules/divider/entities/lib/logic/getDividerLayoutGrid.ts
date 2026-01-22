import type { DividerLayout } from "@/modules/divider/shared/model";
import type { PageFormat } from "@/modules/print/shared/model";
import { expandRectSize, getBoxGrid } from "@/shared/util/size";

type Options = {
	layout: DividerLayout;
	pageFormat: PageFormat;
	withBleed?: boolean;
};

export const getDividerLayoutGrid = ({
	layout,
	pageFormat,
	withBleed,
}: Options) => {
	const size = withBleed
		? expandRectSize(layout.size, layout.bleed)
		: layout.size;

	const pageSize = pageFormat.size.mm;

	return getBoxGrid(pageSize, size);
};

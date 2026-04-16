import type { DividerLayout } from "@/modules/divider/shared/model";
import { MAX_PAGE_PADDING_BLOCK } from "@/modules/print/shared/config";
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
	const boxGrid = getBoxGrid({
		size: pageSize,
		unitSize: size,
		padding: {
			top: MAX_PAGE_PADDING_BLOCK,
			bottom: MAX_PAGE_PADDING_BLOCK,
		},
	});

	return boxGrid;
};

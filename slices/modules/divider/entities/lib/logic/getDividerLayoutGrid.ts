import type { DividerLayout } from "@/modules/divider/shared/model";
import { MAX_PAGE_MARGIN_BLOCK } from "@/modules/print/shared/config";
import type { PageFormat } from "@/modules/print/shared/model";
import type { BoxPosition } from "@/shared/model";
import { getBoxGrid, modifyRectSize } from "@/shared/util/size";

type Options = {
	layout: DividerLayout;
	pageFormat: PageFormat;
	withBleed?: boolean;
	pageMargin: BoxPosition | null;
};

export const getDividerLayoutGrid = ({
	layout,
	pageFormat,
	withBleed,
	pageMargin: marginProp,
}: Options) => {
	const unitSize = withBleed
		? modifyRectSize({
				size: layout.size,
				value: layout.bleed,
			})
		: layout.size;

	const pageSize = pageFormat.size.mm;

	const pageMargin = marginProp ?? {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	const { left, right } = pageMargin;

	const top = Math.max(MAX_PAGE_MARGIN_BLOCK, pageMargin.top);
	const bottom = Math.max(MAX_PAGE_MARGIN_BLOCK, pageMargin.bottom);

	const boxGrid = getBoxGrid({
		size: pageSize,
		unitSize,
		padding: {
			top,
			bottom,
			left,
			right,
		},
	});

	return boxGrid;
};

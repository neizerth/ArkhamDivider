import type { DividerLayout } from "@/modules/divider/shared/model";
import { MAX_PAGE_PADDING_BLOCK } from "@/modules/print/shared/config";
import type { PageFormat } from "@/modules/print/shared/model";
import type { BoxPosition } from "@/shared/model";
import { getBoxGrid, modifyRectSize } from "@/shared/util/size";

type Options = {
	layout: DividerLayout;
	pageFormat: PageFormat;
	withBleed?: boolean;
	pagePadding: BoxPosition | null;
};

export const getDividerLayoutGrid = ({
	layout,
	pageFormat,
	withBleed,
	pagePadding: paddingProp,
}: Options) => {
	const unitSize = withBleed
		? modifyRectSize({
				size: layout.size,
				value: layout.bleed,
			})
		: layout.size;

	const pageSize = pageFormat.size.mm;

	const pagePadding = paddingProp ?? {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	};

	const { left, right } = pagePadding;

	const top = Math.max(MAX_PAGE_PADDING_BLOCK, pagePadding.top);
	const bottom = Math.max(MAX_PAGE_PADDING_BLOCK, pagePadding.bottom);

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

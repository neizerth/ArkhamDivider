import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	CROPMARK_OFFSET,
	MAX_PAGE_MARGIN_BLOCK,
} from "@/modules/print/shared/config";
import type { PageFormat } from "@/modules/print/shared/model";
import type { BoxPosition } from "@/shared/model";
import { getBoxGrid, modifyRectSize } from "@/shared/util/size";

type Options = {
	layout: DividerLayout;
	pageFormat: PageFormat;
	withBleed?: boolean;
	withCropmarks?: boolean;
	pageMargin: BoxPosition | null;
};

export const getDividerLayoutGrid = ({
	layout,
	pageFormat,
	withBleed,
	withCropmarks,
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

	/**
	 * Cropmarks are drawn `CROPMARK_OFFSET` outside the unit box (bleed included, since a
	 * bled unit is already the larger box). Without reserving that strip the outermost
	 * marks fall off the sheet and get clipped, so the grid must give up the space.
	 */
	const cropmarkOffset = withCropmarks
		? CROPMARK_OFFSET + (withBleed ? layout.bleed : 0)
		: 0;

	const left = Math.max(cropmarkOffset, pageMargin.left);
	const right = Math.max(cropmarkOffset, pageMargin.right);

	const top = Math.max(MAX_PAGE_MARGIN_BLOCK, cropmarkOffset, pageMargin.top);
	const bottom = Math.max(
		MAX_PAGE_MARGIN_BLOCK,
		cropmarkOffset,
		pageMargin.bottom,
	);

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

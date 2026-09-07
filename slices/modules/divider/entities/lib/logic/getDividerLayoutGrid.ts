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

	const top = Math.max(MAX_PAGE_MARGIN_BLOCK, cropmarkOffset, pageMargin.top);
	const bottom = Math.max(
		MAX_PAGE_MARGIN_BLOCK,
		cropmarkOffset,
		pageMargin.bottom,
	);

	const getGrid = (inlineOffset: number) =>
		getBoxGrid({
			size: pageSize,
			unitSize,
			padding: {
				top,
				bottom,
				left: Math.max(inlineOffset, pageMargin.left),
				right: Math.max(inlineOffset, pageMargin.right),
			},
		});

	const boxGrid = getGrid(cropmarkOffset);

	if (!cropmarkOffset) {
		return boxGrid;
	}

	/**
	 * Reserving the cropmark strip can cost a whole column: three bled 69mm units are
	 * 207mm of a 210mm sheet, so the 6mm strips drop A4 from 3x2 to 2x2. Fitting fewer
	 * dividers per sheet is the worse trade — the marks clip against the sheet edge, the
	 * dividers themselves stay intact — so the reservation only applies while it is free.
	 */
	const marginGrid = getGrid(0);

	return marginGrid.units > boxGrid.units ? marginGrid : boxGrid;
};

import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	CROPMARK_OFFSET,
	MAX_PAGE_MARGIN_BLOCK,
	PAGE_COUNTER_SIZE,
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

	const getGrid = ({ inline, block }: { inline: number; block: number }) =>
		getBoxGrid({
			size: pageSize,
			unitSize,
			padding: {
				top: Math.max(block, pageMargin.top),
				bottom: Math.max(block, pageMargin.bottom),
				left: Math.max(inline, pageMargin.left),
				right: Math.max(inline, pageMargin.right),
			},
		});

	/**
	 * Both strips the sheet gives up before the grid starts — the cropmark gutter on the
	 * inline sides, and the band that carries the page counter and the credits footer on
	 * the block sides — can cost a whole row or column, and a row is worth more than
	 * either. Three bled 69mm units are 207mm of a 210mm sheet, so the 6mm gutters drop A4
	 * from 3x2 to 2x2; two 100mm units are 200mm of a 216mm US Letter sheet in landscape,
	 * so the 10mm bands drop it from 4x2 to 4x1.
	 *
	 * So each reservation only holds while it is free. Dropped, the cropmarks clip against
	 * the sheet edge and the credits footer gives up its band (it already hides itself when
	 * a page has no room) — the dividers themselves are untouched either way. The block
	 * band never falls below what the counter and the cropmarks need, and the candidates
	 * are ordered most generous first so a tie keeps the roomier sheet.
	 */
	const blockBand = Math.max(MAX_PAGE_MARGIN_BLOCK, cropmarkOffset);
	const minBlockBand = Math.max(PAGE_COUNTER_SIZE, cropmarkOffset);

	const candidates = [
		{ inline: cropmarkOffset, block: blockBand },
		{ inline: cropmarkOffset, block: minBlockBand },
		{ inline: 0, block: blockBand },
		{ inline: 0, block: minBlockBand },
	];

	let best = getGrid(candidates[0]);

	for (const candidate of candidates.slice(1)) {
		const grid = getGrid(candidate);
		if (grid.units > best.units) {
			best = grid;
		}
	}

	return best;
};

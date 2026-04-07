import { path } from "ramda";
import { isNumber } from "ramda-adjunct";
import type { PDFBox, PDFTextService } from "@/modules/pdf/shared/lib";
import type { PDFDividerContext } from "@/modules/pdf/shared/model";
import { arkhamesqueClassicObjects as dividerLayout } from "../../../../config/common";
import { getArkhamesqueClassicXPSymbols } from "../../../../lib";
import { blackInk, xpFontFamily } from "../config";
import type { ArkhamesqueClassicPdfProps } from "../model";

type XpLayout = ReturnType<typeof getArkhamesqueClassicXPSymbols>;

function xpContainerOffset(options: {
	container: XpLayout["container"];
	millimetersToPoints: (millimeters: number) => number;
}) {
	const { container, millimetersToPoints } = options;

	const offsetAlong = (axis: "left" | "top") => {
		const raw = path([axis], container);
		if (!isNumber(raw)) {
			return 0;
		}
		return millimetersToPoints(raw);
	};

	return {
		left: offsetAlong("left"),
		top: offsetAlong("top"),
	};
}

type MeasuredXpGlyph = {
	symbol: XpLayout["symbols"][number];
	fontSizeInPoints: number;
	widthInPoints: number;
};

async function measureXpGlyphs(options: {
	textService: PDFTextService;
	symbols: XpLayout["symbols"];
	millimetersToPoints: (millimeters: number) => number;
}): Promise<MeasuredXpGlyph[]> {
	const { textService, symbols, millimetersToPoints } = options;
	const measured: MeasuredXpGlyph[] = [];

	for (const symbol of symbols) {
		const fontSizeInPoints = millimetersToPoints(symbol.fontSize);
		const widthInPoints = await textService.measureTextWidth(symbol.char, {
			fontFamily: xpFontFamily,
			fontSize: fontSizeInPoints,
		});
		measured.push({ symbol, fontSizeInPoints, widthInPoints });
	}

	return measured;
}

function widthOfXpRow(glyphs: MeasuredXpGlyph[]) {
	let total = 0;

	for (const glyph of glyphs) {
		const { symbol, widthInPoints } = glyph;
		const marginLeft = symbol.marginLeft ?? 0;
		const marginRight = symbol.marginRight ?? 0;
		const letterSpacing = symbol.letterSpacing ?? 0;

		total += marginLeft + widthInPoints + marginRight + letterSpacing;
	}

	return total;
}

function verticalShiftForSymbol(options: {
	symbol: XpLayout["symbols"][number];
	millimetersToPoints: (millimeters: number) => number;
}) {
	const { symbol, millimetersToPoints } = options;
	const offsetMm = symbol.top;
	if (!isNumber(offsetMm)) {
		return 0;
	}
	return millimetersToPoints(offsetMm);
}

async function drawXpRow(options: {
	textService: PDFTextService;
	layout: XpLayout;
	badgeBox: PDFBox;
	millimetersToPoints: (millimeters: number) => number;
}) {
	const { textService, layout, badgeBox, millimetersToPoints } = options;

	const { left: containerLeft, top: containerTop } = xpContainerOffset({
		container: layout.container,
		millimetersToPoints,
	});

	const glyphs = await measureXpGlyphs({
		textService,
		symbols: layout.symbols,
		millimetersToPoints,
	});

	const rowWidth = widthOfXpRow(glyphs);
	const boxLeft = badgeBox.x();
	const boxWidth = badgeBox.width();
	const rowCenterX = boxLeft + boxWidth / 2;
	const startX = rowCenterX - rowWidth / 2 + containerLeft;

	const boxTop = badgeBox.y();
	const boxHeight = badgeBox.height();
	const rowCenterY = boxTop + boxHeight / 2;
	const baselineY = rowCenterY + containerTop;

	let cursorX = startX;

	for (const glyph of glyphs) {
		const { symbol, fontSizeInPoints, widthInPoints } = glyph;

		const marginLeft = symbol.marginLeft ?? 0;
		cursorX += marginLeft;

		const verticalShift = verticalShiftForSymbol({
			symbol,
			millimetersToPoints,
		});
		const drawY = baselineY + verticalShift;

		await textService.draw(symbol.char, {
			x: cursorX,
			y: drawY,
			fontSize: fontSizeInPoints,
			fontFamily: xpFontFamily,
			align: "left",
			baseline: "middle",
			overprint: true,
			color: blackInk,
		});

		const marginRight = symbol.marginRight ?? 0;
		const letterSpacing = symbol.letterSpacing ?? 0;
		cursorX += widthInPoints + marginRight + letterSpacing;
	}
}

export type DrawPlayerXpOptions = {
	textService: PDFTextService;
	unit: PDFDividerContext["unit"];
	props: ArkhamesqueClassicPdfProps;
};

/** No-op when not a player divider or no XP cost. */
export async function drawPlayerXp(options: DrawPlayerXpOptions) {
	const { textService, unit, props } = options;

	if (props.layoutType !== "player" || !props.xpCost) {
		return;
	}

	const bleed = unit.fromBleed();
	const millimetersToPoints = unit.mm;
	const layout = getArkhamesqueClassicXPSymbols(props.xpCost);

	const xp = dividerLayout.xp;
	const badgeBox = bleed.box({
		top: xp.top,
		right: xp.right,
		width: xp.width,
		height: xp.height,
	});

	await drawXpRow({
		textService,
		layout,
		badgeBox,
		millimetersToPoints,
	});
}

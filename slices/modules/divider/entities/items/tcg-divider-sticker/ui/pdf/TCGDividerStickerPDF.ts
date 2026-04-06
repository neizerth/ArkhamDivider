import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import { tcgDividerStickerObjects as O } from "../../config";
import {
	getDefaultTCGDividerSideIcon,
	getDefaultTCGDividerStickerIcon,
	getTCGDividerStickerSideIconObject,
	getTCGDividerStickerTitleObject,
} from "../../lib";
import type { TCGDividerStickerProps } from "../../model";

const blackInk = cmyk(0, 0, 0, 100);

const iconOverprint = { overprint: true, color: blackInk } as const;

/** Matches `getXPCostSx` in TCGDividerSticker.styles (mm). */
const xpRight = 2;
const xpWidth = 10;
const xpFontSize = 5;

export const TCGDividerStickerPDF: PDFDivider<
	TCGDividerStickerProps["params"]
> = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language, playerParams, icon } = ctx;

	const xpCost = getDividerXPCost(props);
	const withXP = Boolean(xpCost);

	const T = getTCGDividerStickerTitleObject(withXP);
	const I = getTCGDividerStickerSideIconObject(withXP);

	const t = withStoryTranslation(story);
	const title = props.customTitle ?? t(props.title);

	const bleed = unit.fromBleed();

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const defaultIcon = getDefaultTCGDividerStickerIcon(props);
	const mainIcon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon,
	});

	if (mainIcon) {
		const box = bleed.box({
			top: O.icon.top,
			left: O.icon.left,
			width: O.icon.width,
			height: O.icon.height,
		});
		await icon.draw(mainIcon, {
			...iconOverprint,
			x: box.x(),
			y: box.y(),
			width: box.width(),
			height: box.height(),
			fontSize: unit.mm(O.icon.fontSize),
			iconOptions: { scaleType: "circle" },
			manifest: false,
		});
	}

	const fontFamily = getDefaultDividerFontFamily(language);
	const textHeight = unit.mm(T.height);

	await text.draw(title, {
		x: bleed.x(T.left),
		y: bleed.y(T.top),
		width: bleed.width(T.left, T.right),
		height: textHeight,
		fontSize: unit.mm((fontSizeScale / 100) * T.fontSize),
		align: "center",
		overprint: true,
		fontFamily,
		color: blackInk,
	});

	if (playerParams.numericXP && props.type === "player" && xpCost) {
		await text.draw(xpCost.name, {
			x: bleed.right(xpRight) - unit.mm(xpWidth),
			y: bleed.y(),
			width: unit.mm(xpWidth),
			height: bleed.height(),
			fontSize: unit.mm(xpFontSize),
			fontFamily: "Arkhamic",
			align: "center",
			baseline: "middle",
			overprint: true,
			color: blackInk,
		});
	}

	const sideIcon = getDividerIcon({
		divider: props,
		param: "sideIcon",
		defaultIcon: getDefaultTCGDividerSideIcon(props),
	});

	if (sideIcon) {
		const box = bleed.box({
			top: I.top,
			right: I.right,
			width: I.width,
			height: I.height,
		});
		await icon.draw(sideIcon, {
			...iconOverprint,
			x: box.x(),
			y: box.y(),
			width: box.width(),
			height: box.height(),
			fontSize: unit.mm(I.fontSize),
			iconOptions: { scaleType: "circle" },
			manifest: false,
		});
	}
};

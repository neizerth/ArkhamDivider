import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getDefaultTCGDividerSideIcon,
	getDefaultTCGDividerStickerIcon,
	getTCGDividerStickerLayoutObjects,
} from "../../lib";
import type {
	TCGDividerStickerLayout,
	TCGDividerStickerProps,
} from "../../model";

const blackInk = cmyk(0, 0, 0, 100);

const iconOverprint = { overprint: true, color: blackInk } as const;

export const TCGDividerStickerPDF: PDFDivider<
	TCGDividerStickerProps["params"]
> = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language, icon, layout } = ctx;

	const xpCost = getDividerXPCost(props);
	const withXP = Boolean(xpCost);
	const withScenario = props.type === "scenario";
	const O = getTCGDividerStickerLayoutObjects({
		layout: layout as TCGDividerStickerLayout,
		withXP,
		withScenario,
	});
	const T = O.title;
	const SI = O.sideIcon;

	const t = withStoryTranslation(story);
	const title = props.customTitle ?? t(props.title);

	const bleed = unit.fromBleed();

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
		cornerRadius: {
			bottomLeft: 0,
			bottomRight: 0,
		},
	});

	const defaultIcon = getDefaultTCGDividerStickerIcon(props);
	const mainIcon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon,
	});

	if (mainIcon) {
		const iconBox = bleed.box({
			top: O.icon.top,
			left: O.icon.left,
			width: O.icon.width,
			bottom: O.icon.bottom,
		});
		await icon.draw(mainIcon, {
			...iconOverprint,
			x: iconBox.x(),
			y: iconBox.y(),
			width: iconBox.width(),
			height: iconBox.height(),
			fontSize: unit.mm(O.icon.fontSize),
			iconOptions: { scaleType: "circle" },
			manifest: false,
		});
	}

	const fontFamily = getDefaultDividerFontFamily(language);

	await text.draw(title, {
		x: bleed.x(T.left),
		y: bleed.y(T.top),
		width: bleed.width(T.left, T.right),
		height: bleed.height(T.top, T.bottom),
		fontSize: unit.mm((fontSizeScale / 100) * T.fontSize),
		align: "center",
		overprint: true,
		fontFamily,
		color: blackInk,
	});

	const sideIcon = getDividerIcon({
		divider: props,
		param: "sideIcon",
		defaultIcon: getDefaultTCGDividerSideIcon(props),
	});

	if (sideIcon) {
		const sideBox =
			"height" in SI && typeof SI.height === "number"
				? bleed.box({
						top: SI.top,
						right: SI.right,
						width: SI.width,
						height: SI.height,
					})
				: bleed.box({
						top: SI.top,
						right: SI.right,
						width: SI.width,
						bottom: SI.bottom,
					});
		await icon.draw(sideIcon, {
			...iconOverprint,
			x: sideBox.x(),
			y: sideBox.y(),
			width: sideBox.width(),
			height: sideBox.height(),
			fontSize: unit.mm(SI.fontSize),
			iconOptions: { scaleType: "circle" },
			manifest: false,
		});
	}
};

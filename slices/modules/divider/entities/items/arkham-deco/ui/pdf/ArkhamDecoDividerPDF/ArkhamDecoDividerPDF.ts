import { cmyk } from "@/modules/core/color/shared/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getArkhamDecoIcons,
	getArkhamDecoLayoutObjects,
	getArkhamDecoTitleObject,
	showArkhamDecoRightIcon,
} from "../../../lib";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerParams,
} from "../../../model";
import { ArkhamDecoDividerLasercut } from "./ArkhamDecoDividerLasercut";

const color = cmyk(0, 0, 0, 100);

/** Inset of the inner content box; matches `getContentSx` in ArkhamDecoDivider.styles. */
const contentPadMm = 0.8;

export const ArkhamDecoDividerPDF: PDFDivider<ArkhamDecoDividerParams> = async (
	props,
	ctx,
) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, unit, language, playerParams, layout } = ctx;
	const lasercut = ctx.lasercut.from(ArkhamDecoDividerLasercut);
	const decoLayout = layout as ArkhamDecoDividerLayout;
	const isTab = decoLayout.params?.tab ?? false;

	const O = getArkhamDecoLayoutObjects(layout.id);
	const xpCost = getDividerXPCost(props);
	const sideXP = playerParams.sideXP ?? false;
	const icons = getArkhamDecoIcons({ divider: props, layout: decoLayout });
	const withCentralIcon = Boolean(icons.center?.icon);
	const T = getArkhamDecoTitleObject({
		type: props.type,
		objects: O,
		xpCost,
		sideXP,
		withCentralIcon,
	});

	const t = withStoryTranslation(story);
	const params = props.params as ArkhamDecoDividerParams | undefined;
	const title = params?.customTitle ?? t(props.title);

	const { mm } = unit;
	const bleed = unit.fromBleed();
	const paddingLeft = contentPadMm;
	const paddingRight = contentPadMm;

	const fontSize = mm((fontSizeScale / 100) * T.fontSize);
	const textHeight = mm(T.height);
	const textTopY = bleed.y(T.top) + textHeight / 2;

	const lasercutBox = {
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	};

	if (isTab) {
		lasercut.drawTab({
			...lasercutBox,
			tab: {
				offsetInline: mm(O.header.left),
				width: bleed.width(O.header.left, O.header.right),
				height: mm(O.header.height),
			},
		});
	} else {
		lasercut.drawRect(lasercutBox);
	}

	const fontFamily = getDefaultDividerFontFamily(language);

	await text.draw(title, {
		x: bleed.x(paddingLeft + T.left),
		y: textTopY,
		width: bleed.width(paddingLeft + T.left, paddingRight + T.right),
		height: textHeight,
		fontSize,
		align: T.textAlign === "center" ? "center" : "left",
		baseline: "middle",
		overprint: true,
		fontFamily,
		color,
	});

	const showRightIcon = showArkhamDecoRightIcon({
		divider: props,
		layout: decoLayout,
		numericXP: playerParams.numericXP ?? false,
	});

	const iconDrawBase = {
		overprint: true,
		color,
	} as const;

	if (icons.left?.icon) {
		const w = mm(O.leftIcon.width);
		const h = mm(O.leftIcon.height);
		await ctx.icon.draw(icons.left.icon, {
			...iconDrawBase,
			x: bleed.x(paddingLeft + O.header.left),
			y: bleed.y(O.leftIcon.offsetTop),
			width: w,
			height: h,
			fontSize: mm(O.leftIcon.fontSize),
		});
	}

	if (showRightIcon && icons.right?.icon) {
		const w = mm(O.rightIcon.width);
		const h = mm(O.rightIcon.height);
		await ctx.icon.draw(icons.right.icon, {
			...iconDrawBase,
			x: bleed.right(paddingRight) - w,
			y: bleed.y(0),
			width: w,
			height: h,
			fontSize: mm(O.rightIcon.fontSize),
		});
	}

	if (icons.center?.icon) {
		const centerSize = mm(O.centralIcon.fontSize);
		const contentWidth = bleed.width(paddingLeft, paddingRight);
		const cx = bleed.x(paddingLeft) + contentWidth / 2 - centerSize / 2;
		const cy = bleed.y(O.header.height - O.centralIcon.offsetTop);

		await ctx.icon.draw(icons.center.icon, {
			...iconDrawBase,
			x: cx,
			y: cy,
			width: centerSize,
			height: centerSize,
			fontSize: mm(O.centralIcon.fontSize),
		});
	}
};

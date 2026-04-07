import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getRynoDividerDefaultRightIcon,
	getRynoDividerDefaultSubtitle,
	getRynoDividerLayoutObjects,
	getRynoDividerTitleObject,
	showRynoDividerSubtitle,
} from "../../../lib";
import type { RynoDividerParams } from "../../../model";

const black = cmyk(0, 0, 0, 100);
const white = cmyk(0, 0, 0, 0);

export const RynoDividerPDF: PDFDivider<RynoDividerParams> = async (
	props,
	ctx,
) => {
	const { story, fontSizeScale = 100, type, layoutType } = props;
	const { text, lasercut, unit, language, layout } = ctx;

	const params = props.params as RynoDividerParams | undefined;

	const O = getRynoDividerLayoutObjects(layout);
	const showSubtitle = showRynoDividerSubtitle(props);
	const T = getRynoDividerTitleObject({
		objects: O,
		showSubtitle,
		type,
	});

	const t = withStoryTranslation(story);
	const title = params?.customTitle ?? t(props.title);

	const { mm } = unit;
	const bleed = unit.fromBleed();

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const fontFamily = getDefaultDividerFontFamily(language);

	const defaultRightIcon = getRynoDividerDefaultRightIcon(props);

	const leftIcon = getDividerIcon({
		divider: props,
		param: "leftIcon",
		defaultIcon: props.icon,
	});
	const rightIcon = getDividerIcon({
		divider: props,
		param: "rightIcon",
		defaultIcon: defaultRightIcon,
	});
	const backgroundIcon = getDividerIcon({
		divider: props,
		param: "backgroundIcon",
		defaultIcon: props.icon,
	});

	if (backgroundIcon) {
		const bgW = bleed.width(O.icons.background.left, O.icons.background.right);
		const bgH = mm(O.icons.background.fontSize);
		await ctx.icon.draw(backgroundIcon, {
			x: bleed.x(O.icons.background.left),
			y: bleed.y(O.icons.background.top),
			width: bgW,
			height: bgH,
			fontSize: mm(O.icons.background.fontSize),
			manifest: false,
			color: black,
			opacity: O.icons.background.opacity,
			overprint: true,
		});
	}

	const showSideIcons = layoutType === "scenario";

	if (showSideIcons && leftIcon) {
		const view = bleed.box({
			top: O.icons.left.top,
			left: O.icons.left.left,
			width: O.icons.left.width,
			height: O.icons.left.height,
		});
		await ctx.icon.draw(leftIcon, {
			x: view.x(),
			y: view.y(),
			width: view.width(),
			height: view.height(),
			fontSize: mm(O.icons.left.fontSize),
			color: black,
			overprint: true,
			iconOptions: { scaleType: "circle" },
		});
	}

	if (showSideIcons && type !== "campaign" && rightIcon) {
		const w = mm(O.icons.right.width);
		const h = mm(O.icons.right.height);
		await ctx.icon.draw(rightIcon, {
			x: bleed.right(O.icons.right.right) - w,
			y: bleed.y(O.icons.right.top),
			width: w,
			height: h,
			fontSize: mm(O.icons.right.fontSize),
			color: white,
			overprint: false,
		});
	}

	const textHeight = mm(T.height);
	const titleTop = bleed.y(T.top);

	await text.draw(title, {
		x: bleed.x(T.left),
		y: titleTop + textHeight / 2,
		width: bleed.width(T.left, T.right),
		height: textHeight,
		fontSize: mm((fontSizeScale / 100) * T.fontSize),
		align: "left",
		baseline: "middle",
		overprint: false,
		fontFamily,
		color: white,
	});

	const defaultSubtitle = getRynoDividerDefaultSubtitle(props);
	const subtitle = params?.customSubtitle ?? defaultSubtitle;

	if (showSubtitle && subtitle) {
		const subFontSize = O.subtitle.fontSize;
		const subH = mm(O.subtitle.height);

		await text.draw(subtitle, {
			x: bleed.x(O.subtitle.left),
			y: bleed.y(O.subtitle.top) + subH / 2,
			width: bleed.width(O.subtitle.left, O.subtitle.right),
			height: subH,
			fontSize: mm(subFontSize),
			fontFamily: "AGaramondProBold",
			align: "left",
			baseline: "middle",
			color: white,
			overprint: false,
		});
	}
};

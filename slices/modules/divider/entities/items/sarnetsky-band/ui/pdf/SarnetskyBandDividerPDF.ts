import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getSarnetskyBandLayoutObjects,
	getSarnetskyBandTitleOffset,
	getSarnetskyBandType,
} from "../../lib";
import type { SarnetskyBandParams } from "../../model";

const black = cmyk(0, 0, 0, 100);
const white = cmyk(0, 0, 0, 0);

export const SarnetskyBandDividerPDF: PDFDivider<SarnetskyBandParams> = async (
	props,
	ctx,
) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language, layout } = ctx;

	const layoutId = layout.id;
	const O = getSarnetskyBandLayoutObjects(layoutId);

	const type = getSarnetskyBandType({ divider: props, layoutId });

	const bleed = unit.fromBleed();
	const { mm } = unit;

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const params = props.params as SarnetskyBandParams | undefined;

	const t = withStoryTranslation(story);
	const translatedTitle = t(props.title);
	const title = params?.customTitle ?? translatedTitle;

	const fontFamily = getDefaultDividerFontFamily(language);

	const titleObject = O.title[type];
	const titleOffset = getSarnetskyBandTitleOffset(props);
	const inlinePosition = O.inlinePosition[type];
	const titleInlineValue = titleObject.inlineValue + titleOffset;

	const titleHeight = mm(titleObject.height);
	const titleFontSize = mm((fontSizeScale / 100) * titleObject.fontSize);

	const titleWidth =
		"width" in titleObject && typeof titleObject.width === "number"
			? mm(titleObject.width)
			: bleed.width();

	const titleX =
		inlinePosition === "right" && titleWidth
			? bleed.right(titleInlineValue) - titleWidth
			: bleed.x(titleInlineValue);

	const overprint = titleObject.color !== "white";

	await text.draw(title, {
		x: titleX,
		y: bleed.y(titleObject.top) + titleHeight / 2,
		width: titleWidth,
		height: titleHeight,
		fontSize: titleFontSize,
		align: titleObject.textAlign as "left" | "center" | "right",
		baseline: "middle",
		overprint,
		fontFamily,
		color: overprint ? black : white,
	});

	const iconObject =
		type === "scenario" || type === "encounter" || type === "standalone"
			? O.icon[type]
			: null;
	const icon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: props.icon,
	});

	if (icon && iconObject) {
		const iconWidth = mm(iconObject.width);
		const iconHeight = mm(iconObject.height);
		const iconX =
			inlinePosition === "right"
				? bleed.right(iconObject.inlineValue + iconObject.width)
				: bleed.x(iconObject.inlineValue);

		await ctx.icon.draw(icon, {
			x: iconX,
			y: bleed.y(iconObject.top),
			width: iconWidth,
			height: iconHeight,
			fontSize: mm(iconObject.fontSize),
			color: black,
			overprint: true,
			iconOptions: { scaleType: "circle" },
		});
	}
};

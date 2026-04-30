import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import {
	getDefaultDividerFontFamily,
	getDividerFaction,
} from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import { binderBookmarkObjects as O } from "../../config/common";
import {
	getBinderBookmarkDefaultIcon,
	getBinderBookmarkTitleObject,
	showBinderBookmarkIcon,
} from "../../lib";
import type { BinderBookmarkProps } from "../../model";

const black = cmyk(0, 0, 0, 100);

export const BinderBookmarkPDF: PDFDivider<BinderBookmarkProps> = async (
	props,
	ctx,
) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language } = ctx;

	const t = withStoryTranslation(story);
	const title =
		(props as { customTitle?: string | null }).customTitle ?? t(props.title);

	const faction = getDividerFaction(props) ?? "neutral";
	const titleObject = getBinderBookmarkTitleObject(language);

	const bleed = unit.fromBleed();
	const { mm } = unit;

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const fontFamily = getDefaultDividerFontFamily(language);
	const titleFontSize = mm((fontSizeScale / 100) * titleObject.fontSize);
	const titleHeight = mm(titleObject.height);

	await text.draw(title, {
		x: bleed.x(titleObject.left),
		y: bleed.y(titleObject.top) + titleHeight / 2,
		width: bleed.width(titleObject.left, titleObject.right),
		height: titleHeight,
		fontSize: titleFontSize,
		align: "center",
		baseline: "middle",
		fontFamily,
		color: black,
		overprint: true,
	});

	const defaultIcon = getBinderBookmarkDefaultIcon(props);

	const icon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon,
	});

	const showIcon = showBinderBookmarkIcon(props);

	if (icon && showIcon) {
		const iconBox = bleed.box({
			top: O.icon.top,
			right: O.icon.right,
			width: O.icon.width,
			height: O.icon.height,
		});

		await ctx.icon.draw(icon, {
			x: iconBox.x(),
			y: iconBox.y(),
			width: iconBox.width(),
			height: iconBox.height(),
			fontSize: mm(O.icon.fontSize),
			color: black,
			overprint: true,
		});
	}
};

import { getLocaleConfig } from "@/modules/core/i18n/shared/lib";
import { cmyk } from "@/modules/pdf/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import { classicDividerObjects as O } from "../../../config";
import { getIconObject } from "../../../lib";

const color = cmyk(0, 0, 0, 100);

export const ClassicDividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const icon = props.customIcon ?? props.icon;
	const { text, unit, language, playerParams } = ctx;
	const t = withStoryTranslation(story);

	const textConfig = getLocaleConfig(language, O.text);
	const title = props.customTitle ?? t(props.title);

	const fontSize = unit.mm((fontSizeScale / 100) * 4.58);
	const bleed = unit.fromBleed();

	const iconObject = getIconObject(props);

	await text.draw(title, {
		x: bleed.x(textConfig.left),
		y: bleed.y(textConfig.top),
		width: bleed.width(textConfig.left, textConfig.right),
		height: unit.mm(textConfig.height),
		fontSize,
		align: "center",
		overprint: true,
		fontFamily: "Conkordia",
		color,
	});

	if (playerParams.numericXP && props.type === "player" && props.xpCost) {
		const { xpCost } = props;
		await text.draw(xpCost.name, {
			x: bleed.x(),
			y: bleed.y(O.xp.side.top),
			width: bleed.width(0, O.xp.side.right + O.xp.side.paddingInline),
			align: "right",
			height: unit.mm(O.xp.side.height),
			fontSize: unit.mm(O.xp.side.fontSize),
			fontFamily: "Arkhamic",
			overprint: true,
			color,
		});
	}

	if (icon) {
		const smallIcon = bleed.box({
			top: iconObject.top,
			right: iconObject.right,
			width: O.icon.size,
			height: O.icon.size,
		});

		await ctx.icon.draw(icon, {
			x: smallIcon.x(),
			y: smallIcon.y(),
			iconOptions: O.icon.params,
			fontSize: unit.mm(iconObject.fontSize),
			width: smallIcon.width(),
			height: smallIcon.height(),
			overprint: true,
			color,
		});

		await ctx.icon.draw(icon, {
			x: bleed.x(),
			y: bleed.y(2),
			width: bleed.width(),
			height: bleed.height(),
			fontSize: unit.mm(O.backgroundIcon.fontSize),
			manifest: false,
			color,
			opacity: O.backgroundIcon.opacity,
			overprint: true,
		});
	}
};

import { cmyk } from "@/modules/core/color/shared/lib";
import { getLocaleConfig } from "@/modules/core/i18n/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import { invocation2018Manifest } from "../../config";
import {
	getInvocation2018DefaultIcon,
	getInvocation2018LayoutObjects,
} from "../../lib";

const color = cmyk(0, 0, 0, 100);

export const iconFontSizeScale = 43 / 40;

export const iconXOffsetScale = 1 + 2e-3;
export const iconYOffsetScale = 1 / (1 + 1e-2);

export const Invocation2018DividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language, playerParams, layout } = ctx;

	const O = getInvocation2018LayoutObjects(layout);
	const t = withStoryTranslation(story);

	const textConfig = getLocaleConfig(language, O.text);
	const title = props.customTitle ?? t(props.title);

	const fontSize = unit.mm((fontSizeScale / 100) * 4.58);
	const bleed = unit.fromBleed();

	const iconObject = O.icon;

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const fontFamily = getDefaultDividerFontFamily(language);

	await text.draw(title, {
		x: bleed.x(textConfig.left),
		y: bleed.y(textConfig.top),
		width: bleed.width(textConfig.left, textConfig.right),
		height: unit.mm(textConfig.height),
		fontSize,
		align: "center",
		overprint: true,
		fontFamily,
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

	const defaultSmallIcon = getInvocation2018DefaultIcon(props);
	const smallIcon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: defaultSmallIcon,
	});
	const showSmallIcon = Boolean(defaultSmallIcon);

	if (smallIcon && showSmallIcon) {
		const view = bleed.box({
			top: iconObject.top,
			right: iconObject.right,
			width: O.icon.size,
			height: O.icon.size,
		});

		await ctx.icon.draw(smallIcon, {
			x: view.x(),
			y: view.y(),
			iconOptions: O.icon.params,
			fontSize: unit.mm(iconObject.fontSize),
			width: view.width(),
			height: view.height(),
			overprint: true,
			color,
			manifest: invocation2018Manifest,
		});
	}
};

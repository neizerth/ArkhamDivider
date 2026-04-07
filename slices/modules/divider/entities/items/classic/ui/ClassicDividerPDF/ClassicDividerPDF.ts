import { cmyk } from "@/modules/core/color/shared/lib";
import { getLocaleConfig } from "@/modules/core/i18n/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getClassicLayoutObjects,
	getDefaultBackgroundIcon,
	getDefaultSmallIcon,
	getIconObject,
} from "../../lib";
import type { ClassicDividerParams } from "../../model";

const color = cmyk(0, 0, 0, 100);

const correction = {
	smallIcon: {
		scale: 40 / 43,
	},
};

export const ClassicDividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language, playerParams, layout } = ctx;

	const O = getClassicLayoutObjects(layout);
	const t = withStoryTranslation(story);

	const params = props.params as ClassicDividerParams | undefined;

	const textConfig = getLocaleConfig(language, O.text);
	const translatedTitle = t(props.title);
	const title = params?.customTitle ?? translatedTitle;

	const fontSize = unit.mm((fontSizeScale / 100) * textConfig.fontSize);
	const bleed = unit.fromBleed();
	const textHeight = unit.mm(textConfig.height);
	const textTop = bleed.y(textConfig.top);

	const iconObject = getIconObject({
		...props,
		layout,
	});

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const fontFamily = getDefaultDividerFontFamily(language);

	await text.draw(title, {
		x: bleed.x(textConfig.left),
		y: textTop + textHeight / 2,
		width: bleed.width(textConfig.left, textConfig.right),
		height: textHeight,
		fontSize,
		align: "center",
		baseline: "middle",
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

	const defaultBackgroundIcon = getDefaultBackgroundIcon(props);

	const backgroundIcon = getDividerIcon({
		divider: props,
		param: "background",
		defaultIcon: defaultBackgroundIcon,
	});

	const defaultSmallIcon = getDefaultSmallIcon(props);

	const smallIcon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: defaultSmallIcon,
	});

	if (smallIcon) {
		const top = iconObject.top * correction.smallIcon.scale;
		const view = bleed.box({
			top,
			right: iconObject.right,
			width: iconObject.width,
			height: iconObject.height,
		});

		await ctx.icon.draw(smallIcon, {
			x: view.x(),
			y: view.y(),
			iconOptions: iconObject.params,
			fontSize: unit.mm(iconObject.fontSize),
			width: view.width(),
			height: view.height(),
			overprint: true,
			color,
		});
	}

	if (backgroundIcon) {
		const bgIconBox = bleed.box({
			top: O.backgroundIcon.top,
			left: O.backgroundIcon.left,
			width: O.backgroundIcon.size,
			height: O.backgroundIcon.size,
		});
		await ctx.icon.draw(backgroundIcon, {
			x: bgIconBox.x(),
			y: bgIconBox.y(),
			width: bgIconBox.width(),
			height: bgIconBox.height(),
			fontSize: unit.mm(O.backgroundIcon.fontSize),
			manifest: false,
			color,
			opacity: O.backgroundIcon.opacity,
			overprint: true,
		});
	}
};

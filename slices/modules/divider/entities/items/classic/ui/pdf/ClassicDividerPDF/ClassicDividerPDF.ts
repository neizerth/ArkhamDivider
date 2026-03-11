import { getLocaleConfig } from "@/modules/core/i18n/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { cmyk } from "@/modules/pdf/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getClassicLayoutFontFamily,
	getClassicLayoutObjects,
	getDefaultSmallIcon,
	getIconObject,
} from "../../../lib";

const color = cmyk(0, 0, 0, 100);

export const ClassicDividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language, playerParams, layout } = ctx;

	const O = getClassicLayoutObjects(layout);
	const t = withStoryTranslation(story);

	const textConfig = getLocaleConfig(language, O.text);
	const title = props.customTitle ?? t(props.title);

	const fontSize = unit.mm((fontSizeScale / 100) * 4.58);
	const bleed = unit.fromBleed();

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

	const fontFamily = getClassicLayoutFontFamily(language);

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

	const backgroundIcon = getDividerIcon({
		divider: props,
		param: "background",
		defaultIcon: props.icon,
	});

	const defaultSmallIcon = getDefaultSmallIcon(props);

	const smallIcon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: defaultSmallIcon,
	});

	if (smallIcon) {
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

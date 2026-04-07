import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import {
	getDividerFaction,
	getDividerSubtype,
	getDividerXPCost,
} from "@/modules/divider/shared/lib/logic";
import type {
	DrawIconOptions,
	DrawTextOptions,
} from "@/modules/pdf/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getSarnetskyDefaultDividerIcon as getDefaultDividerIcon,
	getSarnetskyDefaultScenarioSubtitle as getDefaultScenarioSubtitle,
	getIsSarnetskyLightTitleColor as getIsLightTitleColor,
	getSarnetskyLayoutObjects as getLayoutObjects,
	getSarnetskyTitleObject,
} from "../../lib";
import type { SarnetskyDividerParams } from "../../model";

const black = cmyk(0, 0, 0, 100);
const white = cmyk(0, 0, 0, 0);

export const SarnetskyDividerPDF: PDFDivider<SarnetskyDividerParams> = async (
	props,
	ctx,
) => {
	const { story, fontSizeScale = 100, type } = props;
	const { text, lasercut, unit, language, layout } = ctx;

	const params = props.params as SarnetskyDividerParams | undefined;

	const xpCost = getDividerXPCost(props);

	const O = getLayoutObjects(layout);
	const T = getSarnetskyTitleObject({
		objects: O,
		type,
		xpCost,
	});
	const t = withStoryTranslation(story);

	const translatedTitle = t(props.title);
	const title = params?.customTitle ?? translatedTitle;

	const { mm } = unit;

	const fontSize = mm((fontSizeScale / 100) * T.fontSize);
	const bleed = unit.fromBleed();

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const fontFamily = getDefaultDividerFontFamily(language);

	const textHeight = mm(T.height);
	const textTop = bleed.y(T.top);

	const subtype = getDividerSubtype(props);
	const faction = getDividerFaction(props);

	const isLight = getIsLightTitleColor({
		faction,
		subtype,
	});

	const color = isLight ? white : black;

	await text.draw(title, {
		x: bleed.x(T.left),
		y: textTop + textHeight / 2,
		width: bleed.width(T.left, T.right),
		height: textHeight,
		fontSize,
		align: "center",
		baseline: "middle",
		overprint: !isLight,
		fontFamily,
		color,
	});

	const iconObjects = O.icons[type] ?? [];

	const defaultCampaignIcon = props.story?.icon;

	for (const config of iconObjects) {
		const defaultIcon = getDefaultDividerIcon({
			type: config.type,
			iconId: config.id,
			icon: props.icon,
			campaignIcon: defaultCampaignIcon,
		});

		// const customIcon = params?.[config.id];
		const customIcon = getDividerIcon({
			divider: props,
			param: config.id,
			defaultIcon,
		});

		if (!customIcon) {
			continue;
		}

		const color = config.light ? white : black;

		await ctx.icon.draw(customIcon, {
			x: bleed.right(config.right + config.width),
			y: bleed.y(config.top),
			width: mm(config.width),
			height: mm(config.height),
			fontSize: mm(config.fontSize),
			color,
			overprint: !config.light,
			iconOptions: config.params,
		});
	}

	const backgroundIcon = getDividerIcon({
		divider: props,
		param: "background",
		defaultIcon: props.icon,
	});

	const bgRect = params?.backgroundIconRect;

	if (props.layoutType === "scenario" && bgRect && backgroundIcon) {
		const bgBox = bleed.box({
			top: bgRect.top,
			left: bgRect.left,
			width: bgRect.width,
			height: bgRect.height,
		});
		const fontSize = mm(bgRect.height);

		const drawOptions = {
			x: bgBox.x(),
			y: bgBox.y(),
			width: bgBox.width(),
			height: bgBox.height(),
			fontSize,
			color: black,
			opacity: O.background.opacity,
			overprint: true,
			manifest: false,
		} as DrawIconOptions;

		await ctx.icon.draw(backgroundIcon, drawOptions);
	}

	const scenarioEncounters = params?.scenarioEncounters ?? [];

	if (props.layoutType === "scenario" && scenarioEncounters.length > 0) {
		for (const encounter of scenarioEncounters) {
			const box = bleed.box({
				top: encounter.top,
				left: encounter.left,
				width: encounter.width,
				height: encounter.height,
			});
			const fontSize = mm(encounter.height);

			await ctx.icon.draw(encounter.icon, {
				x: box.x(),
				y: box.y(),
				width: box.width(),
				height: box.height(),
				fontSize,
				color: black,
				overprint: true,
			});
		}
	}

	if (props.type === "scenario") {
		const defaultValue = getDefaultScenarioSubtitle({
			story: props.story,
			scenario: props.scenario,
			space: " ",
			t,
		});
		const value = params?.scenarioSubtitle ?? defaultValue;
		const scenarioSubtitle = value.replace(/\u{200B}/gu, " ");

		const fontSize = O.subtitle.fontSize;

		const top = O.subtitle.top + (fontSize * O.subtitle.lineHeight) / 2;

		const drawOptions = {
			x: bleed.x(O.subtitle.left),
			y: bleed.y(top),
			width: bleed.width(O.subtitle.left, O.subtitle.right),
			fontSize: mm(fontSize),
			fontFamily: "ArnoProBoldItalic",
			align: "center",
			baseline: "middle",
			color: black,
			overprint: true,
		} as DrawTextOptions;

		console.log("subtitle draw options", drawOptions, scenarioSubtitle);

		await text.draw(scenarioSubtitle, drawOptions);
	}

	if (props.type === "player") {
	}
};

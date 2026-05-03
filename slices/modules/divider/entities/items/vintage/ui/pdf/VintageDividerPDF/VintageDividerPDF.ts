import { cmyk } from "@/modules/core/color/shared/lib";
import { getLocaleConfig } from "@/modules/core/i18n/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import {
	getDividerXPCost,
	selectDividerTabIndex,
} from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getVintageDividerDefaultIcon,
	getVintageDividerIconObject,
	getVintageDividerObjects,
	getVintageDividerTabsCount,
	getVintageDividerTitleFontFamily,
} from "../../../lib";
import type {
	VintageDividerLayout,
	VintageDividerParams,
} from "../../../model";
import { VintageDividerLasercut } from "./VintageDividerLasercut";

const black = cmyk(0, 0, 0, 100);

export const VintageDividerPDF: PDFDivider<VintageDividerParams> = async (
	props,
	ctx,
) => {
	const { story, side } = props;
	const { text, unit, language, layout, state } = ctx;

	const vintageLayout = layout as VintageDividerLayout;
	const O = getVintageDividerObjects(vintageLayout.id);

	const t = withStoryTranslation(story);
	const params = props.params as VintageDividerParams | undefined;

	const title = params?.customTitle ?? t(props.title);
	const topTitle = params?.customTopTitle ?? (story ? t(story.name) : "");
	const tabsCount = getVintageDividerTabsCount(vintageLayout);

	const tabIndex = selectDividerTabIndex({
		id: props.id,
		tabsCount,
		side: props.side,
	})(state);

	const bleed = unit.fromBleed();
	const { mm } = unit;

	// Lasercut outline with a tab.
	if (side === "front") {
		const lasercut = ctx.lasercut.from(VintageDividerLasercut);
		lasercut.drawTab({
			x: bleed.x(),
			y: bleed.y(),
			width: bleed.width(),
			height: bleed.height(),
			tab: {
				offsetInline: mm(O.tab.width * tabIndex),
				width: mm(O.tab.width),
				height: mm(O.tab.height),
			},
		});
	}

	const fontFamily = getVintageDividerTitleFontFamily(language);

	// Draw top title (overprint black).
	{
		const topCfg = getLocaleConfig(language, O.topTitle);
		const topScale = params?.topTitleFontSizeScale ?? 100;
		const h = mm(topCfg.height);
		await text.draw(topTitle, {
			x: bleed.x(topCfg.left),
			y: bleed.y(topCfg.top) + h / 2,
			width: bleed.width(topCfg.left, topCfg.right),
			height: h,
			fontSize: mm((topScale / 100) * topCfg.fontSize),
			align: "center",
			baseline: "middle",
			fontFamily,
			color: black,
			overprint: true,
		});
	}

	// Draw main title (overprint black).
	{
		const titleCfg = getLocaleConfig(language, O.title);
		const fontSizeScale = props.fontSizeScale ?? 100;
		const h = mm(titleCfg.height);
		await text.draw(title, {
			x: bleed.x(titleCfg.left),
			y: bleed.y(titleCfg.top) + h / 2,
			width: bleed.width(titleCfg.left, titleCfg.right),
			height: h,
			fontSize: mm((fontSizeScale / 100) * titleCfg.fontSize),
			align: "center",
			baseline: "middle",
			fontFamily,
			color: black,
			overprint: true,
		});
	}

	// Icon (overprint black), with tabIndex horizontal shift (matches web styles).
	const defaultIcon = getVintageDividerDefaultIcon(props);
	const icon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon,
	});

	const xpCost = getDividerXPCost(props);

	const I = getVintageDividerIconObject({
		withXP: Boolean(xpCost),
		objects: O,
	});

	if (icon) {
		const iconBox = bleed.box({
			top: I.top,
			left: I.left + O.tab.width * tabIndex,
			width: I.width,
			height: I.height,
		});

		await ctx.icon.draw(icon, {
			x: iconBox.x(),
			y: iconBox.y(),
			width: iconBox.width(),
			height: iconBox.height(),
			fontSize: mm(I.fontSize),
			color: black,
			overprint: true,
			iconOptions: { scaleType: "circle" },
		});
	}
};

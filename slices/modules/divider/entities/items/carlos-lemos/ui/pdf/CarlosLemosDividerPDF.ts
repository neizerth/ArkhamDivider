import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import { carlosLemosObjects as O } from "../../config/objects";
import { getCarlsoLemosEncounterIconPositions } from "../../lib";
import type { CarlosLemosDividerParams } from "../../model";

const black = cmyk(0, 0, 0, 100);

export const CarlosLemosDividerPDF: PDFDivider<
	NonNullable<CarlosLemosDividerParams["params"]>
> = async (props, ctx) => {
	const { story, fontSizeScale = 100, type, side } = props;
	const { text, lasercut, unit, language, layout } = ctx;
	const { mm } = unit;
	const bleed = unit.fromBleed();

	if (side === "front") {
		lasercut.drawRect({
			x: bleed.x(),
			y: bleed.y(),
			width: bleed.width(),
			height: bleed.height(),
		});
	}

	const params = props.params;
	const t = withStoryTranslation(story);
	const fontFamily = getDefaultDividerFontFamily(language);
	const isEncounter = type === "encounter";
	const iconDrawBase = {
		color: black,
		overprint: true,
		iconOptions: O.icon.params,
	} as const;

	if (isEncounter) {
		const positions = getCarlsoLemosEncounterIconPositions({
			divider: props,
			dividerWidth: layout.size.width,
		});

		for (const { icon, top, left } of positions) {
			if (!icon) {
				continue;
			}

			const iconBox = bleed.box({
				top,
				left,
				width: O.encounterIcon.width,
				height: O.encounterIcon.height,
			});

			await ctx.icon.draw(icon, {
				...iconDrawBase,
				x: iconBox.x(),
				y: iconBox.y(),
				width: iconBox.width(),
				height: iconBox.height(),
				fontSize: mm(O.encounterIcon.fontSize),
			});
		}
	} else {
		const title = params?.customTitle ?? t(props.title);
		if (title) {
			const titleScale = params?.custonFontSizeScale ?? fontSizeScale;
			const titleHeight = mm(O.title.height);

			await text.draw(title, {
				x: bleed.x(O.title.left),
				y: bleed.y(O.title.top) + titleHeight / 2,
				width: bleed.width(O.title.left, O.title.right),
				height: titleHeight,
				fontSize: mm((titleScale / 100) * O.title.fontSize),
				align: "left",
				baseline: "middle",
				fontFamily,
				color: black,
				overprint: true,
			});
		}

		const icon = getDividerIcon({
			divider: props,
			param: "icon",
			defaultIcon: props.icon,
		});

		if (icon) {
			const iconBox = bleed.box({
				top: O.icon.top,
				right: O.icon.right,
				width: O.icon.width,
				height: O.icon.height,
			});

			await ctx.icon.draw(icon, {
				...iconDrawBase,
				x: iconBox.x(),
				y: iconBox.y(),
				width: iconBox.width(),
				height: iconBox.height(),
				fontSize: mm(O.icon.fontSize),
			});
		}

		if (type === "scenario") {
			const scenarioNumber = props.scenario.number_text;
			if (scenarioNumber) {
				const numberScale = params?.scenarioNumberFontSizeScale ?? 100;
				const numberBox = bleed.box({
					top: O.scenarioNumber.top,
					right: O.scenarioNumber.right,
					width: O.scenarioNumber.width,
					height: O.scenarioNumber.height,
				});

				await text.draw(scenarioNumber, {
					x: numberBox.x(),
					y: numberBox.y() + numberBox.height() / 2,
					width: numberBox.width(),
					height: numberBox.height(),
					fontSize: mm((numberScale / 100) * O.scenarioNumber.fontSize),
					align: "center",
					baseline: "middle",
					fontFamily: "Arkhamic",
					color: black,
					overprint: true,
				});
			}
		}
	}

	if (type !== "campaign" && story) {
		const campaignTitle = t(story.name);
		if (campaignTitle) {
			const campaignHeight = mm(O.campaignTitle.height);

			await text.draw(campaignTitle, {
				x: bleed.x(O.campaignTitle.left),
				y: bleed.y(O.campaignTitle.top) + campaignHeight / 2,
				width: bleed.width(O.campaignTitle.left, O.campaignTitle.right),
				height: campaignHeight,
				fontSize: mm(O.campaignTitle.fontSize),
				align: "center",
				baseline: "middle",
				fontFamily: "ArnoProBold",
				color: black,
				overprint: true,
			});
		}
	}
};

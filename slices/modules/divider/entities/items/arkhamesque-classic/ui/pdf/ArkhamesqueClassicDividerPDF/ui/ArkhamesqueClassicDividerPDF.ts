import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import type { PDFDivider, PDFDividerContext } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import { selectArkhamesqueClassicData } from "../../../../lib";
import type { ArkhamesqueClassicDividerParams } from "../../../../model";
import {
	drawBottomIcon,
	drawLeftIcon,
	drawPlayerXp,
	drawScenarioNumber,
	drawTitle,
	stampLasercut,
} from "../lib";
import type { ArkhamesqueClassicPdfProps } from "../model";

/** Vector pass over the page cell: lasercut, text, XP, icons (raster background is drawn earlier). */
export const ArkhamesqueClassicDividerPDF: PDFDivider<ArkhamesqueClassicDividerParams> =
	async function paintVectorOverlay(
		pageItem: ArkhamesqueClassicPdfProps,
		context: PDFDividerContext,
	) {
		const { story, fontSizeScale = 100 } = pageItem;
		const { text, lasercut, unit, language, icon, state } = context;

		const arkhamesqueData = selectArkhamesqueClassicData(state);

		if (!arkhamesqueData) {
			return;
		}

		const translateStory = withStoryTranslation(story);
		const params = pageItem.params as
			| ArkhamesqueClassicDividerParams
			| undefined;
		const titleFontFamily = getDefaultDividerFontFamily(language);

		stampLasercut({ lasercut, unit });

		await drawTitle({
			textService: text,
			unit,
			props: pageItem,
			params,
			translate: translateStory,
			titleFontFamily,
			fontSizePercentScale: fontSizeScale,
		});

		await drawScenarioNumber({
			textService: text,
			unit,
			props: pageItem,
			params,
			arkhamesqueData,
			titleFontFamily,
			fontSizePercentScale: fontSizeScale,
		});

		await drawPlayerXp({
			textService: text,
			unit,
			props: pageItem,
		});

		await drawLeftIcon({
			iconService: icon,
			unit,
			props: pageItem,
		});

		await drawBottomIcon({
			iconService: icon,
			unit,
			props: pageItem,
		});
	};

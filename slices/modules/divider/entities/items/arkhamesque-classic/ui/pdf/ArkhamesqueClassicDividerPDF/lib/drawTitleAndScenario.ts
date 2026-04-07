import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import type { PDFTextService } from "@/modules/pdf/shared/lib";
import type { PDFDividerContext } from "@/modules/pdf/shared/model";
import type { FontFamily } from "@/shared/model";
import { arkhamesqueClassicObjects as dividerLayout } from "../../../../config/common";
import { getArkhamesqueClassicScenarioNumberText } from "../../../../lib";
import type { ArkhamesqueClassicDividerParams } from "../../../../model";
import { blackInk, SCENARIO_NUMBER_VERTICAL_TRIM } from "../config";
import type { ArkhamesqueClassicPdfProps } from "../model";
import {
	effectiveTitle,
	scaleFromPercent,
	scenarioNumberScale,
} from "./fontScale";

type DrawTitleAndScenarioBase = {
	textService: PDFTextService;
	unit: PDFDividerContext["unit"];
	props: ArkhamesqueClassicPdfProps;
	params: ArkhamesqueClassicDividerParams | undefined;
	titleFontFamily: FontFamily;
	fontSizePercentScale: number;
};

export type DrawTitleOptions = DrawTitleAndScenarioBase & {
	translate: (key: string) => string;
};

export type DrawScenarioNumberOptions = DrawTitleAndScenarioBase & {
	arkhamesqueData: IArkhamesqueBuild;
};

export async function drawTitle(options: DrawTitleOptions) {
	const {
		textService,
		unit,
		props,
		params,
		translate,
		titleFontFamily,
		fontSizePercentScale,
	} = options;

	const bleed = unit.fromBleed();
	const millimetersToPoints = unit.mm;
	const scale = scaleFromPercent(fontSizePercentScale);
	const line = effectiveTitle({
		params,
		titleKey: props.title,
		translate,
	});
	const fontSize = millimetersToPoints(scale * dividerLayout.title.fontSize);
	const blockHeight = millimetersToPoints(dividerLayout.title.height);

	await textService.draw(line, {
		x: bleed.x(dividerLayout.title.left),
		y: bleed.y(dividerLayout.title.top) + blockHeight / 2,
		width: bleed.width(dividerLayout.title.left, dividerLayout.title.right),
		height: blockHeight,
		fontSize,
		align: "center",
		baseline: "middle",
		overprint: true,
		fontFamily: titleFontFamily,
		color: blackInk,
	});
}

/** No-op when layout is not scenario or there is no number string. */
export async function drawScenarioNumber(options: DrawScenarioNumberOptions) {
	const {
		textService,
		unit,
		props,
		params,
		arkhamesqueData,
		titleFontFamily,
		fontSizePercentScale,
	} = options;

	if (props.layoutType !== "scenario") {
		return;
	}

	const label = getArkhamesqueClassicScenarioNumberText({
		data: arkhamesqueData,
		divider: props,
	});
	if (!label) {
		return;
	}

	const bleed = unit.fromBleed();
	const millimetersToPoints = unit.mm;
	const metrics = dividerLayout.scenarioNumber;
	const fontSize = millimetersToPoints(
		metrics.fontSize * scenarioNumberScale({ params, fontSizePercentScale }),
	);
	const box = bleed.box({
		top: metrics.top,
		right: metrics.right,
		width: metrics.width,
		height: metrics.height,
	});
	const centerY =
		box.y() + box.height() / 2 + SCENARIO_NUMBER_VERTICAL_TRIM * fontSize;

	await textService.draw(label, {
		x: box.x(),
		y: centerY,
		width: box.width(),
		height: box.height(),
		fontSize,
		align: "center",
		baseline: "middle",
		overprint: true,
		fontFamily: titleFontFamily,
		color: blackInk,
	});
}

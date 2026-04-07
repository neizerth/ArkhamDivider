import { getDividerIcon } from "@/modules/divider/features/lib";
import type { PDFIconService } from "@/modules/pdf/shared/lib";
import type { PDFDividerContext } from "@/modules/pdf/shared/model";
import { arkhamesqueClassicObjects as dividerLayout } from "../../../../config/common";
import {
	arkhamesqueClassicBottomManifest,
	arkhamesqueClassicManifest,
} from "../../../../config/icons/manifest";
import {
	getDefaultArkhamesqueClassicBottomIcon,
	showArkhamesqueClassicBottomIcon,
	showArkhamesqueClassicIcon,
} from "../../../../lib";
import { blackInk } from "../config";
import type { ArkhamesqueClassicPdfProps } from "../model";

const iconOverprint = { overprint: true, color: blackInk } as const;

export type DrawDividerIconOptions = {
	iconService: PDFIconService;
	unit: PDFDividerContext["unit"];
	props: ArkhamesqueClassicPdfProps;
};

/** Scenario-side glyph; no-op when hidden or missing. */
export async function drawLeftIcon(options: DrawDividerIconOptions) {
	const { iconService, unit, props } = options;

	if (!showArkhamesqueClassicIcon(props)) {
		return;
	}

	const iconId = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: props.icon,
	});
	if (!iconId) {
		return;
	}

	const bleed = unit.fromBleed();
	const millimetersToPoints = unit.mm;
	const metrics = dividerLayout.icon;
	const box = bleed.box({
		top: metrics.top,
		left: metrics.left,
		width: metrics.width,
		height: metrics.height,
	});

	await iconService.draw(iconId, {
		...iconOverprint,
		x: box.x(),
		y: box.y(),
		width: box.width(),
		height: box.height(),
		fontSize: millimetersToPoints(metrics.fontSize),
		manifest: arkhamesqueClassicManifest,
		iconOptions: { scaleType: "circle" },
	});
}

/** Bottom strip icon; no-op when hidden or missing. */
export async function drawBottomIcon(options: DrawDividerIconOptions) {
	const { iconService, unit, props } = options;

	if (!showArkhamesqueClassicBottomIcon(props)) {
		return;
	}

	const iconId = getDividerIcon({
		divider: props,
		param: "bottomIcon",
		defaultIcon: getDefaultArkhamesqueClassicBottomIcon(props),
	});
	if (!iconId) {
		return;
	}

	const bleed = unit.fromBleed();
	const millimetersToPoints = unit.mm;
	const metrics = dividerLayout.bottomIcon;
	const box = bleed.box({
		top: metrics.top,
		left: metrics.left,
		right: metrics.right,
		height: metrics.height,
	});

	await iconService.draw(iconId, {
		...iconOverprint,
		x: box.x(),
		y: box.y(),
		width: box.width(),
		height: box.height(),
		fontSize: millimetersToPoints(metrics.fontSize),
		manifest: arkhamesqueClassicBottomManifest,
		iconOptions: { scaleType: "circle" },
	});
}

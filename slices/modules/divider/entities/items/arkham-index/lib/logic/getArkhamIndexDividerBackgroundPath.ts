import { path as d3Path } from "d3-path";
import { SVGPath } from "@/entities/common/lib";
import type { ArkhamIndexDividerTabSize } from "../../model";

const path = () => SVGPath.of(d3Path());

export type Options = {
	width: number;
	height: number;
	cornerRadius: number;
	tabHeight: number;
	tabSideWidth: number;
	tabWidths: Record<number, number>;
	tabSize: ArkhamIndexDividerTabSize;
	tabIndex: number;
	x?: number;
	y?: number;
	gap?: number;
};

type TabbedOptions = Options & { tabSize: number };

const getRoundedPath = ({
	width: w,
	height: h,
	cornerRadius: r,
	x = 0,
	y = 0,
	gap = 0,
}: Options) => {
	const ox = x - gap;
	const oy = y - gap;
	return path()
		.moveTo(ox + r, oy)
		.lineTo(ox + w - r, oy)
		.arcTo(ox + w, oy, ox + w, oy + r, r)
		.lineTo(ox + w, oy + h - r)
		.arcTo(ox + w, oy + h, ox + w - r, oy + h, r)
		.lineTo(ox + r, oy + h)
		.arcTo(ox, oy + h, ox, oy + h - r, r)
		.lineTo(ox, oy + r)
		.arcTo(ox, oy, ox + r, oy, r)
		.closePath()
		.toString();
};

const getTabContentWidth = (options: {
	tabWidths: Record<number, number>;
	tabSize: ArkhamIndexDividerTabSize;
	tabSideWidth: number;
	width: number;
}) => {
	const { tabSideWidth } = options;
	return getArkhamIndexDividerTabWidth(options) - 2 * tabSideWidth;
};

export const getArkhamIndexDividerTabWidth = ({
	tabWidths,
	tabSize,
	width,
}: {
	tabWidths: Record<number, number>;
	tabSize: ArkhamIndexDividerTabSize;
	width: number;
}) => {
	if (tabSize === "full") {
		return width;
	}
	return tabWidths[tabSize];
};

export const getArkhamIndexDividerTabLeft = ({
	tabSize,
	tabIndex,
	width,
	tabWidths,
	cornerRadius,
}: {
	tabSize: ArkhamIndexDividerTabSize;
	tabIndex: number;
	width: number;
	tabWidths: Record<number, number>;
	cornerRadius: number;
}) => {
	if (tabIndex === 0 || tabSize === 3 || tabSize === "full") {
		return cornerRadius;
	}

	const lastTabIndex = 3 - tabSize;
	const isLastTab = tabIndex >= lastTabIndex;
	const tabWidth = getArkhamIndexDividerTabWidth({ tabWidths, tabSize, width });

	if (tabSize === 2 || isLastTab) {
		return width - tabWidth - cornerRadius;
	}

	return (width - tabWidth) / 2;
};

const getTabbedPath = (options: TabbedOptions) => {
	const {
		width: w,
		height: h,
		tabHeight: tH,
		tabSideWidth,
		cornerRadius: r,
		x = 0,
		y = 0,
		gap = 0,
	} = options;
	const ox = x - gap;
	const oy = y - gap;

	const tabContentWidth = getTabContentWidth(options);

	const tabLeft = getArkhamIndexDividerTabLeft(options);
	const tabRight = tabLeft + tabSideWidth * 2 + tabContentWidth;
	const innerLeft = tabLeft + tabSideWidth;
	const innerRight = innerLeft + tabContentWidth;

	// These two values control the “hill” shape on both sides of the tab.
	// Tune the ratios to get a tighter/flatter curve, while keeping left/right symmetric.
	const tabCurviness = {
		/** X offset of the control point on the bottom edge (y = tH) */
		bottom: tabSideWidth * 0.4,
		/** X offset of the control point on the top edge (y = 0) */
		top: tabSideWidth * 0.6,
	};
	return (
		path()
			.moveTo(ox + tabLeft, oy + tH)
			.bezierCurveTo(
				ox + tabLeft + tabCurviness.bottom,
				oy + tH,
				ox + tabLeft + tabCurviness.top,
				oy,
				ox + innerLeft,
				oy,
			)
			// tab top border
			.lineTo(ox + innerRight, oy)
			.bezierCurveTo(
				ox + innerRight + (tabSideWidth - tabCurviness.top),
				oy,
				ox + innerRight + (tabSideWidth - tabCurviness.bottom),
				oy + tH,
				ox + tabRight,
				oy + tH,
			)

			// tab body
			.lineTo(ox + w - r, oy + tH)
			.arcTo(ox + w, oy + tH, ox + w, oy + tH + r, r)
			.lineTo(ox + w, oy + h - r)
			.arcTo(ox + w, oy + h, ox + w - r, oy + h, r)
			.lineTo(ox + r, oy + h)
			.arcTo(ox, oy + h, ox, oy + h - r, r)
			.lineTo(ox, oy + tH + r)
			.arcTo(ox, oy + tH, ox + r, oy + tH, r)
			.closePath()
			.toString()
	);
};

/**
 * Path for a stroke-only border: top tab with symmetric hills, bottom body with rounded lower corners; or full rounded rect when `tabSize === "full"`.
 * Coordinates in px; build inputs with `getPrintUnit` / `usePrintUnitCallback`.
 */
export const getArkhamIndexDividerBackgroundPath = (
	options: Options,
): string => {
	const x = options.x ?? 0;
	const y = options.y ?? 0;
	const gap = options.gap ?? 0;
	const adjusted: Options = {
		...options,
		x,
		y,
		gap,
		width: options.width + 2 * gap,
		height: options.height + 2 * gap,
	};

	if (adjusted.tabSize === "full") {
		return getRoundedPath(adjusted);
	}

	return getTabbedPath(adjusted as TabbedOptions);
};

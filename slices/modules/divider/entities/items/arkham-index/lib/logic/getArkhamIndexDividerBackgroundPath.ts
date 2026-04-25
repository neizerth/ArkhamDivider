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
};

type TabbedOptions = Options & { tabSize: number };

const getRoundedPath = ({ width: w, height: h, cornerRadius: r }: Options) => {
	return path()
		.moveTo(r, 0)
		.lineTo(w - r, 0)
		.arcTo(w, 0, w, r, r)
		.lineTo(w, h - r)
		.arcTo(w, h, w - r, h, r)
		.lineTo(r, h)
		.arcTo(0, h, 0, h - r, r)
		.lineTo(0, r)
		.arcTo(0, 0, r, 0, r)
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
	} = options;

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
			.moveTo(tabLeft, tH)
			.bezierCurveTo(
				tabLeft + tabCurviness.bottom,
				tH,
				tabLeft + tabCurviness.top,
				0,
				innerLeft,
				0,
			)
			// tab top border
			.lineTo(innerRight, 0)
			.bezierCurveTo(
				innerRight + (tabSideWidth - tabCurviness.top),
				0,
				innerRight + (tabSideWidth - tabCurviness.bottom),
				tH,
				tabRight,
				tH,
			)

			// tab body
			.lineTo(w - r, tH)
			.arcTo(w, tH, w, tH + r, r)
			.lineTo(w, h - r)
			.arcTo(w, h, w - r, h, r)
			.lineTo(r, h)
			.arcTo(0, h, 0, h - r, r)
			.lineTo(0, tH + r)
			.arcTo(0, tH, r, tH, r)
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
	if (options.tabSize === "full") {
		return getRoundedPath(options);
	}

	return getTabbedPath(options as TabbedOptions);
};

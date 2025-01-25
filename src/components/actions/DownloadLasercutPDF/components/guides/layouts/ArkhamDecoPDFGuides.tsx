import { ArkhamDecoDividerType } from "@/shared/data/layouts/arkham-deco";
import { ILayout } from "@/shared/types/layouts";
import { IBox } from "@/shared/types/units";
import { toPrintSize } from "@/shared/lib/features/util/units";
import { Path } from "@react-pdf/renderer";
import { PDFDividerGuides, PDFDividerGuidesProps } from "../PDFDividerGuides";
import { BLEED_GAP } from "../../../constants";

export type ArkhamDecoPDFGuidesProps = PDFDividerGuidesProps & {
	layout: ILayout;
	radius: number;
};

const TAB_SIZE: IBox = {
	width: 21.3 + BLEED_GAP / 2,
	height: 4,
};

const SMALL_TAB_SIZE: IBox = {
	width: 17.3 + BLEED_GAP / 2,
	height: 4,
};

const LAYOUT_BOXES: Record<string, IBox> = {
	"arkham-deco-tab": TAB_SIZE,
	"arkham-deco-tab-bw": TAB_SIZE,
	"arkham-deco-small": SMALL_TAB_SIZE,
	"arkham-deco-small-bw": SMALL_TAB_SIZE,
};

export const ArkhamDecoPDFGuides = ({
	layout,
	...props
}: ArkhamDecoPDFGuidesProps) => {
	const { id, customParams } = layout;
	const layoutType =
		(customParams?.type as ArkhamDecoDividerType) || "standard";
	const isTab = layoutType === ArkhamDecoDividerType.TAB;

	if (!(id in LAYOUT_BOXES) || !isTab) {
		return <PDFDividerGuides {...props} />;
	}

	const box = LAYOUT_BOXES[id];

	const guide = {
		width: Math.round(toPrintSize(box.width)),
		height: Math.round(toPrintSize(box.height)),
	};

	const { x, width, height, radius } = props;
	const y = props.y + toPrintSize(BLEED_GAP / 2);

	const topRightCorner =
		radius > 0
			? [
					["L", x + width - radius, y + guide.height],
					[
						"Q",
						[x + width, y + guide.height].join(", "),
						[x + width, y + guide.height + radius].join(", "),
					],
				]
			: [["L", x + width, y + guide.height]];

	const topLeftCorner =
		radius > 0
			? [
					["M", x, y + guide.height + radius],
					[
						"Q",
						[x, y + guide.height].join(", "),
						[x + radius, y + guide.height].join(", "),
					],
				]
			: [["M", x, y + guide.height]];

	const bottomRightCorner =
		radius > 0
			? [
					["L", x + width, y + height - radius],
					[
						"Q",
						[x + width, y + height].join(", "),
						[x + width - radius, y + height].join(", "),
					],
				]
			: [["L", x + width, y + height]];

	const bottomLeftCorner =
		radius > 0
			? [
					["L", x + radius, y + height],
					[
						"Q",
						[x, y + height].join(", "),
						[x, y + height - radius].join(", "),
					],
					["L", x, y + guide.height + radius],
				]
			: [
					["L", x, y + height],
					["L", x, y + guide.height],
				];

	const paths = [
		...topLeftCorner,
		// tab
		["L", x + guide.width, y + guide.height],
		["L", x + guide.width, y],
		["L", x + width - guide.width, y],
		["L", x + width - guide.width, y + guide.height],
		...topRightCorner,
		...bottomRightCorner,
		...bottomLeftCorner,
	];

	const d = paths.map((path) => path.join(" ")).join(" ");

	return <Path d={d} stroke="red" strokeWidth={1} />;
};

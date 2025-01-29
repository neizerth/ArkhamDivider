import { IIcon } from "@/shared/model/types/api";
import { ILayoutBleed } from "@/shared/model/types/layouts";
import { IBox, IBoxOffset } from "@/shared/model/types/units";
import { toPrintSize } from "@/shared/lib/features/util/units";

export type IIconContainer = IBox & {
	x: number;
	y: number;
	alignX?: "left" | "center" | "right";
	alignY?: "top" | "center" | "bottom";
};

export type GetBleedCanvasSizeOptions = IOffsetOptions & {
	bleed: ILayoutBleed;
};

export type IOffsetOptions = {
	offset?: Partial<IBoxOffset>;
	offsetSize?: number;
};

export const getBleedCanvasSize = (bleed: ILayoutBleed) => {
	const width = Math.ceil(toPrintSize(bleed.width));
	const height = Math.ceil(toPrintSize(bleed.height));

	return { width, height };
};

export type ICanvasIcon = {
	icon: IIcon;
	size: number;
};

export type GetCanvasSizeOptions = IOffsetOptions & {
	defaultCanvasSize: IBox;
	icons: ICanvasIcon[];
};

export const getCanvasSize = ({
	defaultCanvasSize,
	icons,
	offset,
	offsetSize,
}: GetCanvasSizeOptions) => {
	const entryCavasSizes = icons.map((item) =>
		getEntryCanvasSize(item, defaultCanvasSize),
	);

	// console.log(entryCavasSizes);

	const canvasSize = entryCavasSizes.reduce((target, canvasSize) => {
		if (canvasSize.width > target.width || canvasSize.height > target.height) {
			return canvasSize;
		}

		return target;
	}, defaultCanvasSize);

	return addOffset(canvasSize, {
		offset,
		offsetSize,
	});
};

export const getEntryCanvasSize = (item: ICanvasIcon, defaultSize: IBox) => {
	const scale = item.icon.height / item.size;

	return {
		width: Math.ceil(scale * defaultSize.width),
		height: Math.ceil(scale * defaultSize.height),
	};
};

export const addOffset = (size: IBox, params: IOffsetOptions) => {
	const { width, height } = size;
	const { offset = {}, offsetSize = 1 } = params;

	const left = offset?.left || offsetSize;
	const right = offset?.right || offsetSize;
	const top = offset?.top || offsetSize;
	const bottom = offset?.left || offsetSize;

	return {
		width: width + left + right,
		height: height + top + bottom,
	};
};

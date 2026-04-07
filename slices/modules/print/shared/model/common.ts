import type { SxProps } from "@mui/material/styles";
import type { BoxSize } from "@/shared/model";

export type DPI = 300 | 600 | 1200;

export type PrintUnitProps<T = object> = T & {
	mm: (value: number) => string;
	dpi: DPI;
};

export type PrintUnitCallback<T, Input = object> = (
	props: PrintUnitProps<Input>,
) => T;

export type PrintSxCallback<T = object> = PrintUnitCallback<SxProps, T>;

type XPosition = "left" | "right";
type YPosition = "top" | "bottom";
type Position = XPosition | YPosition;
type TopPosition = `top${Capitalize<XPosition>}`;
type BottomPosition = `bottom${Capitalize<XPosition>}`;

export type CropmarkType = "horizontal" | "vertical";
export type CropmarkPositionType = TopPosition | BottomPosition;
export type CropmarkPosition = Partial<Record<Position, boolean>>;

export type Cropmark = {
	id: string;
	type: CropmarkType;
	position: CropmarkPosition;
};

export type BaseCropmarkProps = CropmarkPosition & {
	bleed: number;
	bleedEnabled: boolean;
	mmSize: number;
	unitSize: BoxSize;
};

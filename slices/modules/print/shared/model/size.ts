import type { BoxPosition, BoxSize } from "@/shared/model";

export type PrintUnit = {
	px: number;
	mm: number;
};

export type PrintSize = {
	mm: BoxSize;
	px: BoxSize;
};
export type PrintPosition = {
	mm: BoxPosition;
	px: BoxPosition;
};

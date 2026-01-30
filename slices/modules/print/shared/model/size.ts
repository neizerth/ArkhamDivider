import type { BoxSize } from "@/shared/model";
import type { DPI } from "./common";

export type PrintUnit = {
	px: number;
	mm: number;
};

export type PrintSize = Record<DPI | "mm", BoxSize>;

import { DEFAULT_PRINT_DPI, INCH_TO_MM } from "../../config";
import type { PrintUnit } from "../../model";

export const createPrintUnit = (mm: number, px: number): PrintUnit => ({
	px,
	mm,
});

export const in2px = (inches: number, dpi = DEFAULT_PRINT_DPI) => {
	return inches * dpi;
};

export const mm2px = (mm: number, dpi = DEFAULT_PRINT_DPI) => {
	return Math.round((mm * dpi) / INCH_TO_MM);
};

export const fromPx = (scale: number) => (value: number) =>
	`${Math.round(value * scale)}px`;

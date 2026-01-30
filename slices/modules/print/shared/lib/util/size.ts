import { DEFAULT_PRINT_DPI, INCH_TO_MM } from "../../config";

export const in2px = (inches: number, dpi = DEFAULT_PRINT_DPI) => {
	return inches * dpi;
};

export const mm2px = (mm: number, dpi = DEFAULT_PRINT_DPI) => {
	return Math.round((mm * dpi) / INCH_TO_MM);
};

export const fromPx = (scale: number) => (value: number) =>
	`${Math.round(value * scale)}px`;

export const fromDPI = (dpi: number) => {
	const scale = mm2px(1, dpi);
	return (value: number) => Math.round(value * scale);
};

import memoize from "fast-memoize";
import { DEFAULT_PRINT_DPI, INCH_TO_MM, PT_TO_MM } from "../../config";
import type { DPI } from "../../model";

export const in2px = (inches: number, dpi = DEFAULT_PRINT_DPI) => {
	return inches * dpi;
};

export const mm2px = (mm: number, dpi = DEFAULT_PRINT_DPI) => {
	return Math.round((mm * dpi) / INCH_TO_MM);
};

export const px2mm = (px: number, dpi = DEFAULT_PRINT_DPI) => {
	return Math.round((px * INCH_TO_MM) / dpi);
};

export const pt2px = (pt: number, dpi = DEFAULT_PRINT_DPI) => {
	return Math.round((pt * dpi) / 72);
};

export const px2pt = (px: number, dpi = DEFAULT_PRINT_DPI, round = false) => {
	const result = (px * 72) / dpi;
	if (round) {
		return Math.round(result);
	}
	return result;
};

export const mm2pt = (mm: number, round = false) => {
	const result = mm / PT_TO_MM;
	if (round) {
		return Math.round(result);
	}
	return result;
};

export const fromPx = (scale: number) => (value: number) =>
	`${Math.round(value * scale)}px`;

/** Convert mm to px */
export const fromDPI = memoize((dpi: DPI) => {
	return (mm: number) => mm2px(mm, dpi);
});

/** Convert px to pt */
export const fromPx2Pt = memoize((dpi: DPI) => {
	return (px: number) => px2pt(px, dpi);
});

export const fromPt2Px = memoize((dpi: DPI) => {
	return (pt: number) => pt2px(pt, dpi);
});

export const fromMm2Px = memoize((dpi: DPI) => {
	return (mm: number) => mm2px(mm, dpi);
});

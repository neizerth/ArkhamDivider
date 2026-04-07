import { INCH_TO_MM } from "../../config";
import type { DPI } from "../../model";

/**
 * @function getPrintUnit
 * Convert millimeters to pixels at the given DPI
 * @param mm - The number of millimeters
 * @param dpi - The DPI to use
 * @returns The number of pixels
 */
export const getPrintUnit = (mm: number, dpi: DPI) => {
	return Math.round(mm * (dpi / INCH_TO_MM));
};

export const getPrintUnitPx = (mm: number, dpi: DPI) => {
	return `${getPrintUnit(mm, dpi)}px`;
};

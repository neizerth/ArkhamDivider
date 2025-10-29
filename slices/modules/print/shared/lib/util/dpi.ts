import { DEFAULT_PRINT_DPI, INCH_TO_MM } from "../../config/common";

export const getDPI = (px: number, mm: number) => {
	return Math.round((px / mm) * INCH_TO_MM);
};

export const getWebPrintScale = (dpi = DEFAULT_PRINT_DPI) =>
	dpi / getBrowserDPI();

export const getBrowserDPI = (mm = 100) => {
	const node = document.createElement("div");
	node.style.width = `${mm}mm`;
	document.body.append(node);

	const rect = node.getBoundingClientRect();
	const px = rect.width;

	node.remove();

	return getDPI(px, mm);
};

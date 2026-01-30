import { createSize as size } from "@/shared/util";
import type { PageFormat, PageFormatType, PrintSize } from "../model";

export const PageSize: Record<PageFormatType, PrintSize> = {
	A4: {
		mm: size(210, 297),
		300: size(2480, 3508),
		600: size(4960, 7016),
		1200: size(9920, 14032),
	},
	A3: {
		mm: size(297, 420),
		300: size(3508, 4961),
		600: size(7016, 9922),
		1200: size(14032, 19844),
	},
	B4: {
		mm: size(250, 353),
		300: size(2953, 4169),
		600: size(5906, 8339),
		1200: size(11812, 16678),
	},
	B3: {
		mm: size(353, 500),
		300: size(4169, 5906),
		600: size(8339, 11811),
		1200: size(16678, 23622),
	},
	SRA4: {
		mm: size(225, 320),
		300: size(2657, 3780),
		600: size(5315, 7560),
		1200: size(10630, 15120),
	},
	SRA3: {
		mm: size(320, 450),
		300: size(3780, 5315),
		600: size(7560, 10630),
		1200: size(15120, 21260),
	},
	Letter: {
		mm: size(216, 279),
		300: size(2550, 3300),
		600: size(5100, 6600),
		1200: size(10200, 13200),
	},
	Legal: {
		mm: size(216, 356),
		300: size(2550, 4200),
		600: size(5100, 8400),
		1200: size(10200, 16800),
	},
	Tabloid: {
		mm: size(279, 432),
		300: size(3300, 5100),
		600: size(6600, 10200),
		1200: size(13200, 20400),
	},
};

const createFormat = (type: PageFormatType, name: string = type) => ({
	type,
	name,
	size: PageSize[type],
});

export const pageSizeFormats: PageFormat[] = [
	createFormat("A4"),
	createFormat("A3"),
	createFormat("B4"),
	createFormat("B3"),
	createFormat("SRA4"),
	createFormat("SRA3"),
	createFormat("Letter", "US Letter"),
	createFormat("Legal", "US Legal"),
	createFormat("Tabloid", "US Tabloid"),
];

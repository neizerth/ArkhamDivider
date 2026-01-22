import { createSize as size } from "@/shared/util";
import type { PageFormat, PageFormatType, PrintSize } from "../model";

export const PageSize: Record<PageFormatType, PrintSize> = {
	A4: {
		mm: size(210, 297),
		px: size(2480, 3508),
	},
	A3: {
		mm: size(297, 420),
		px: size(3508, 4961),
	},
	B4: {
		mm: size(250, 353),
		px: size(2953, 4169),
	},
	B3: {
		mm: size(353, 500),
		px: size(4169, 5906),
	},
	SRA4: {
		mm: size(225, 320),
		px: size(2657, 3780),
	},
	SRA3: {
		mm: size(320, 450),
		px: size(3780, 5315),
	},
	Letter: {
		mm: size(216, 279),
		px: size(2550, 3300),
	},
	Legal: {
		mm: size(216, 356),
		px: size(2550, 4200),
	},
	Tabloid: {
		mm: size(279, 432),
		px: size(3300, 5100),
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

import type { BoxSize } from "@/shared/model";

type CommonFormat = "A" | "B" | "SRA";
type CommonSize = 4 | 3;

export type PageFormatType =
	| `${CommonFormat}${CommonSize}`
	| "Letter"
	| "Legal"
	| "Tabloid";

export type PageFormatSize = {
	// page size in mm
	mm: BoxSize;
	// page size in px at 300 dpi
	px: BoxSize;
};

export type PageFormat = {
	type: PageFormatType;
	name: string;
	size: PageFormatSize;
};

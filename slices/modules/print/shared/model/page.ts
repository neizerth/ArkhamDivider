import type { BoxSize, Side } from "@/shared/model";
import type { PrintSize } from "./size";

type CommonFormat = "A" | "B" | "SRA";
type CommonSize = 4 | 3;

export type PageFormatType =
	| `${CommonFormat}${CommonSize}`
	| "Letter"
	| "Legal"
	| "Tabloid";

export type PageFormat = {
	type: PageFormatType;
	name: string;
	size: PrintSize;
};

export type PageLayoutRow<T> = {
	id: string;
	items: T[];
};

export type PageLayout<T> = {
	id: string;
	number: number;
	total: number;
	side: Side;
	items: PageLayoutRow<T>[];
	itemsCount: number;
	isLast: boolean;
	isFirst: boolean;
	grid: PageLayoutGrid;
};

export type PageLayoutGrid = {
	/** Unit size in mm */
	unitSize: BoxSize;
	/** Layout size in mm */
	size: BoxSize;
	rows: number;
	cols: number;
};

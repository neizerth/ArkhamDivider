import type { BoxSize } from "@/shared/model";
import { rotateBoxSize } from "@/shared/util";
import type { DPI, PageFormat } from "../../model";

export const rotatePageFormat = (pageFormat: PageFormat): PageFormat => {
	const rotatedSize = Object.fromEntries(
		Object.entries(pageFormat.size).map(([key, value]) => [
			key,
			rotateBoxSize(value),
		]),
	) as Record<DPI, BoxSize>;

	return {
		...pageFormat,
		size: {
			mm: rotateBoxSize(pageFormat.size.mm),
			...rotatedSize,
		},
	};
};

import { isNotNil, range } from "ramda";
import {
	getPageLayoutOffsetPx,
	getUnitSizePx,
} from "@/modules/print/shared/lib";
import type { DPI, PageFormat, PageLayout } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";

type Options<T> = {
	pageLayouts: PageLayout<T>[];
	pageFormat: PageFormat;
	dpi: DPI;
};

type Item<T> = T & {
	size: BoxSize;
	position: { x: number; y: number };
};

export type PDFPageLayout<T> = PageLayout<Item<T>>;

export const getPDFPageLayouts = <T>({
	pageLayouts,
	pageFormat,
	dpi,
}: Options<T>) => {
	return pageLayouts.map((pageLayout): PDFPageLayout<T> => {
		const { grid } = pageLayout;
		const rows = range(0, grid.rows);
		const cols = range(0, grid.cols);

		const size = getUnitSizePx({ pageLayout, dpi });
		const layoutOffset = getPageLayoutOffsetPx({ pageLayout, dpi, pageFormat });
		const items = rows.map((rowIndex) => {
			const colData = cols.map((colIndex): Item<T> | null => {
				const item: T | undefined =
					pageLayout?.items[rowIndex]?.items[colIndex];

				if (!item) {
					return null;
				}

				const x = layoutOffset.x + rowIndex * size.width;
				const y = layoutOffset.y + colIndex * size.height;
				const position = {
					x,
					y,
				};

				return {
					...item,
					size,
					position,
				};
			});
			const items = colData.filter(isNotNil);

			const row = pageLayout?.items[rowIndex];

			return {
				...row,
				items,
				layoutOffset,
			};
		});

		return {
			...pageLayout,
			items,
		};
	});
};

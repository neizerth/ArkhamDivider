import { v4 } from "uuid";
import type { PageLayout, PageLayoutGrid, PageLayoutRow } from "../../model";

type Options<T> = {
	data: T[];
	layoutGrid: PageLayoutGrid;
	doubleSided?: boolean;
	singleItemPerPage?: boolean;
};

export const getPageLayouts = <T>(options: Options<T>) => {
	const frontLayouts = getFrontLayouts(options);
	if (!options.doubleSided) {
		return frontLayouts;
	}
	const backLayouts = getBackLayouts(frontLayouts);

	const layouts: PageLayout<T>[] = [];
	for (let i = 0; i < frontLayouts.length; i++) {
		layouts.push(frontLayouts[i]);
		layouts.push(backLayouts[i]);
	}
	return layouts;
};

const getBackLayouts = <T>(frontLayouts: PageLayout<T>[]) => {
	const backLayouts: PageLayout<T>[] = [];

	for (const frontLayout of frontLayouts) {
		const items = frontLayout.items.map((row) => ({
			...row,
			id: v4(),
			items: row.items
				.toReversed()
				.map((item) => (item != null ? { ...item, side: "back" } : item)),
		}));
		const backLayout: PageLayout<T> = {
			...frontLayout,
			side: "back",
			items,
			id: v4(),
		};
		backLayouts.push(backLayout);
	}
	return backLayouts;
};

const getFrontLayouts = <T>({
	data,
	layoutGrid,
	singleItemPerPage,
}: Options<T>) => {
	const { rows, unitSize } = layoutGrid;
	const pageLayouts: PageLayout<T>[] = [];
	const itemsPerPage = singleItemPerPage ? 1 : rows * layoutGrid.cols;
	const totalPages = Math.ceil(data.length / itemsPerPage);

	const grid = singleItemPerPage
		? { rows: 1, cols: 1, size: unitSize, unitSize }
		: layoutGrid;

	// Must match `grid.cols`: `PrintablePage` indexes by `grid.rows` × `grid.cols`.
	// If we pad rows with the original `layoutGrid.cols` while `grid.cols` is 1,
	// `toReversed()` on the back moves the only item out of column 0 → empty back.
	const pageCols = grid.cols;

	for (let i = 0; i < data.length; i += itemsPerPage) {
		const chunk = data.slice(i, i + itemsPerPage);
		const isLast = i + itemsPerPage >= data.length;
		const isFirst = i === 0;

		const items: PageLayoutRow<T>[] = [];
		for (let j = 0; j < chunk.length; j += pageCols) {
			const row = chunk.slice(j, j + pageCols);
			const paddedRow: Array<T | undefined> = [...row];
			while (paddedRow.length < pageCols) {
				paddedRow.push(undefined);
			}

			items.push({
				id: v4(),
				items: paddedRow,
			});
		}

		const pageNumber = pageLayouts.length + 1;

		const pageLayout: PageLayout<T> = {
			id: v4(),
			number: pageNumber,
			side: "front",
			items,
			itemsCount: items.length,
			isLast,
			isFirst,
			total: totalPages,
			grid,
		};
		pageLayouts.push(pageLayout);
	}
	return pageLayouts;
};

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
			items: row.items.reverse(),
			id: v4(),
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
	const { rows, cols, size } = layoutGrid;
	const pageLayouts: PageLayout<T>[] = [];
	const itemsPerPage = singleItemPerPage ? 1 : rows * cols;
	const totalPages = Math.ceil(data.length / itemsPerPage);

	for (let i = 0; i < data.length; i += itemsPerPage) {
		const chunk = data.slice(i, i + itemsPerPage);
		const isLast = i + itemsPerPage >= data.length;

		const items: PageLayoutRow<T>[] = [];
		for (let j = 0; j < chunk.length; j += rows) {
			const row = chunk.slice(j, j + rows);

			items.push({
				id: v4(),
				items: row,
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
			total: totalPages,
			size,
		};
		pageLayouts.push(pageLayout);
	}
	return pageLayouts;
};

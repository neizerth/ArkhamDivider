import { createSelector } from "@reduxjs/toolkit";
import { selectDividersWithRelations } from "@/modules/divider/features/lib";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import {
	selectDoubleSidePrintEnabled,
	selectPageLayoutGrid,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import type { PageLayout } from "@/modules/print/shared/model";
import { getDividerPageLayouts } from "../../logic";

/**
 * Reuse previous page layout objects when their item references are unchanged.
 * Without this, a single `setDividerParam` rebuilds every page and defeats
 * `memo(PrintablePage)` even for pages that did not change.
 */
const reuseUnchangedPageLayouts = (
	next: PageLayout<DividerWithRelations>[],
	prev: PageLayout<DividerWithRelations>[],
): PageLayout<DividerWithRelations>[] => {
	if (prev.length === 0) {
		return next;
	}

	let changed = false;
	const result = next.map((page, index) => {
		const previous = prev[index];
		if (
			previous &&
			previous.side === page.side &&
			previous.number === page.number &&
			previous.total === page.total &&
			previous.grid === page.grid &&
			previous.isLast === page.isLast &&
			previous.isFirst === page.isFirst &&
			samePageItems(previous, page)
		) {
			return previous;
		}

		changed = true;
		return page;
	});

	if (!changed && result.length === prev.length) {
		return prev;
	}

	return result;
};

const samePageItems = (
	a: PageLayout<DividerWithRelations>,
	b: PageLayout<DividerWithRelations>,
) => {
	if (a.items.length !== b.items.length) {
		return false;
	}

	return a.items.every((row, rowIndex) => {
		const other = b.items[rowIndex];
		if (!other || row.items.length !== other.items.length) {
			return false;
		}
		return row.items.every((item, colIndex) => item === other.items[colIndex]);
	});
};

let prevPageLayouts: PageLayout<DividerWithRelations>[] = [];

export const selectDividerPageLayouts = createSelector(
	[
		selectDividersWithRelations,
		selectDoubleSidePrintEnabled,
		selectSingleItemPerPage,
		selectPageLayoutGrid,
	],
	(dividers, doubleSided, singleItemPerPage, layoutGrid) => {
		if (!layoutGrid || !dividers) {
			prevPageLayouts = [];
			return prevPageLayouts;
		}

		const next = getDividerPageLayouts({
			dividers,
			doubleSided,
			singleItemPerPage,
			layoutGrid,
		});

		prevPageLayouts = reuseUnchangedPageLayouts(next, prevPageLayouts);
		return prevPageLayouts;
	},
);

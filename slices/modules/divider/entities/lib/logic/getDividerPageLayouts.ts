import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { getPageLayouts } from "@/modules/print/shared/lib";
import type { PageLayoutGrid } from "@/modules/print/shared/model";

type Options<T extends DividerWithRelations> = {
	dividers: T[];
	layoutGrid: PageLayoutGrid;
	doubleSided?: boolean;
	singleItemPerPage?: boolean;
};
export const getDividerPageLayouts = <T extends DividerWithRelations>({
	dividers,
	doubleSided,
	singleItemPerPage,
	layoutGrid,
}: Options<T>) => {
	const pageLayouts = getPageLayouts({
		data: dividers,
		layoutGrid,
		singleItemPerPage,
		doubleSided,
	});

	return pageLayouts;
};

import type { Divider } from "@/modules/divider/shared/model";
import { getPageLayouts } from "@/modules/print/shared/lib";
import type { PageLayoutGrid } from "@/modules/print/shared/model";

type Options = {
	dividers: Divider[];
	layoutGrid: PageLayoutGrid;
	doubleSided?: boolean;
	singleItemPerPage?: boolean;
};
export const getDividerPageLayouts = ({
	dividers,
	doubleSided,
	singleItemPerPage,
	layoutGrid,
}: Options) => {
	const pageLayouts = getPageLayouts({
		data: dividers,
		layoutGrid,
		singleItemPerPage,
		doubleSided,
	});

	return pageLayouts;
};

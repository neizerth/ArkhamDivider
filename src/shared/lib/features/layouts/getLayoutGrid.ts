import { ILayout } from "@/shared/model/types/layouts";
import {
	PageOrientation,
	PageSize,
	PageSizeType,
} from "@/shared/model/types/print";

export const getLayoutGrid = ({
	layout,
	bleed,
	pageSizeType,
}: {
	layout: ILayout;
	bleed: boolean;
	pageSizeType: PageSizeType;
}) => {
	const { width, height } = bleed ? layout.bleed : layout;
	const page = PageSize[pageSizeType];

	const getOrientationGrid = ({
		rowSize,
		colSize,
		pageOrientation,
	}: {
		rowSize: number;
		colSize: number;
		pageOrientation: PageOrientation;
	}) => {
		const rowsPerPage = Math.floor(rowSize / width);
		const colsPerPage = Math.floor(colSize / height);
		const itemsPerPage = rowsPerPage * colsPerPage;
		return {
			rowsPerPage,
			colsPerPage,
			itemsPerPage,
			pageOrientation,
		};
	};

	const portrait = getOrientationGrid({
		rowSize: page.width,
		colSize: page.height,
		pageOrientation: PageOrientation.PORTRAIT,
	});

	const landscape = getOrientationGrid({
		rowSize: page.height,
		colSize: page.width,
		pageOrientation: PageOrientation.LANDSCAPE,
	});

	return landscape.itemsPerPage > portrait.itemsPerPage ? landscape : portrait;
};

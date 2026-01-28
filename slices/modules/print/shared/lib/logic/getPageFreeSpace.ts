import type { BoxSize } from "@/shared/model";
import { PAGE_TOP_PADDING } from "../../config";

export type GetPageFreeSpaceOptions = {
	pageSize: BoxSize;
	areaSize: BoxSize;
	isLast?: boolean;
};

export const getPageFreeSpace = ({
	pageSize,
	areaSize,
	isLast,
}: GetPageFreeSpaceOptions) => {
	const spaceSize = {
		width: pageSize.width - areaSize.width,
		height: pageSize.height - areaSize.height,
	};

	if (isLast) {
		spaceSize.height -= PAGE_TOP_PADDING;
	}

	return spaceSize;
};

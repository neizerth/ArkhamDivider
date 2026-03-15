import type { BoxSize } from "@/shared/model";
import { PAGE_PADDING_BLOCK } from "../../config";

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
		spaceSize.height -= PAGE_PADDING_BLOCK * 2;
	}

	return spaceSize;
};

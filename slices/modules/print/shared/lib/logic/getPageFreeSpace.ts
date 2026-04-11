import type { BoxSize } from "@/shared/model";

export type GetPageFreeSpaceOptions = {
	pageSize: BoxSize;
	areaSize: BoxSize;
};

export const getPageFreeSpace = ({
	pageSize,
	areaSize,
}: GetPageFreeSpaceOptions) => {
	const spaceSize = {
		width: pageSize.width - areaSize.width,
		height: pageSize.height - areaSize.height,
	};

	return spaceSize;
};

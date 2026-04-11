import { MAX_PAGE_PADDING_BLOCK, PAGE_CREDITS_SIZE } from "../../config";
import {
	type GetPageFreeSpaceOptions,
	getPageFreeSpace,
} from "./getPageFreeSpace";

type Options = GetPageFreeSpaceOptions & {
	isLast: boolean;
};
export const getPagePaddingTop = (options: Options) => {
	const { isLast } = options;
	const freeSpace = getPageFreeSpace(options);

	if (!isLast) {
		return 0;
	}

	const availableSpace = Math.max(0, freeSpace.height - PAGE_CREDITS_SIZE);

	return Math.min(availableSpace, MAX_PAGE_PADDING_BLOCK);
};

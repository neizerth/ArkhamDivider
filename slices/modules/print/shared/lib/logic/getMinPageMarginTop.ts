import { creditsParams, MAX_PAGE_MARGIN_BLOCK } from "../../config";
import {
	type GetPageFreeSpaceOptions,
	getPageFreeSpace,
} from "./getPageFreeSpace";

type Options = GetPageFreeSpaceOptions & {
	isLast: boolean;
};
export const getMinPageMarginTop = (options: Options) => {
	const { isLast } = options;
	const freeSpace = getPageFreeSpace(options);

	if (!isLast) {
		return 0;
	}

	const availableSpace = Math.max(
		0,
		freeSpace.height - creditsParams.contentSize,
	);

	return Math.min(availableSpace, MAX_PAGE_MARGIN_BLOCK);
};

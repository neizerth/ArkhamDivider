import { creditsParams } from "../../config";
import {
	type GetPageFreeSpaceOptions,
	getPageFreeSpace,
} from "./getPageFreeSpace";

type Options = GetPageFreeSpaceOptions;
export const canShowPageCredits = (options: Options) => {
	const { height } = getPageFreeSpace(options);

	return height > creditsParams.contentSize;
};

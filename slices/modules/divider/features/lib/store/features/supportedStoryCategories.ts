import { arkhamIndexCategoryId } from "@/modules/divider/entities/items/arkham-index/config";
import { arkhamesqueClassicCategoryId } from "@/modules/divider/entities/items/arkhamesque-classic/config";

/**
 * Categories that decide the `supported` flag of a story themselves.
 *
 * Every such saga also resets the flags when the active category is *not* its
 * own — that reset is meant for plain categories that support everything. Since
 * all of these sagas listen to the same `setCategoryId`, the one running last
 * used to wipe the flags the owning saga had just written, and unsupported
 * campaigns showed up as available.
 */
const supportedStoryCategoryIds: string[] = [
	arkhamIndexCategoryId,
	arkhamesqueClassicCategoryId,
];

export const ownsStorySupport = (categoryId: string | null) =>
	categoryId !== null && supportedStoryCategoryIds.includes(categoryId);

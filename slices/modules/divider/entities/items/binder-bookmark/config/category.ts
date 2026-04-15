import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { VladimirYazykovCredits } from "@/shared/config";
import { binderBookmarkCategoryId } from "./common";
import { binderBookmarkLayouts } from "./layouts";

export const binderBookmarkCategory: DividerCategory = createDividerCategory({
	id: binderBookmarkCategoryId,
	type: "bookmark",
	name: "category.binder-bookmark.name",
	image: "/images/divider/background/binder-bookmark/category.avif",
	layouts: binderBookmarkLayouts,
	authors: [VladimirYazykovCredits],
});

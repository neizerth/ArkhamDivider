import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { VladimirYazykovCredits } from "@/shared/config";
import { simpleStickerCategoryId } from "./common";
import { simpleStickerLayouts } from "./layouts";

export const simpleStickerCategory: DividerCategory = createDividerCategory({
	id: simpleStickerCategoryId,
	type: "sticker",
	name: "category.simple-sticker.name",
	description: "category.simple-sticker.description",
	image: "/images/divider/render/simple-sticker.avif",
	layouts: simpleStickerLayouts,
	authors: [VladimirYazykovCredits],
});

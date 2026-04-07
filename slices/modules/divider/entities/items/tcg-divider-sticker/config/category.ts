import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { VladimirYazykovCredits } from "@/shared/config";
import { tcgDividerStickerCategoryId } from "./common";
import { tcgDividerStickerLayouts } from "./layouts";

export const tcgDividerStickerCategory: DividerCategory = createDividerCategory(
	{
		id: tcgDividerStickerCategoryId,
		type: "sticker",
		name: "category.tcg-divider-sticker.name",
		image: "/images/divider/render/tcg-divider-sticker/category.avif",
		layouts: tcgDividerStickerLayouts,
		authors: [VladimirYazykovCredits],
	},
);
2;

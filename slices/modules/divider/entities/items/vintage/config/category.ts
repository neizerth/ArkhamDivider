import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { BobLafouineCredits } from "@/shared/config";
import { vintageDividerCategoryId } from "./common";
import { vintageLayouts } from "./layouts";

export const vintageCategory: DividerCategory = createDividerCategory({
	id: vintageDividerCategoryId,
	type: "divider",
	authors: [BobLafouineCredits],
	name: "Vintage",
	image: "/images/divider/render/vintage.avif",
	layouts: vintageLayouts,
});

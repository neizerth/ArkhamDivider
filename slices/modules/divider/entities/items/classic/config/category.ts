import { createDividerCategory } from "@/modules/divider/shared/lib/logic/createDividerCategory";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { FFGCredits } from "@/shared/config";
import { classicCategoryId } from "./common";
import { classicLayouts } from "./layouts";

export const classicCategory: DividerCategory = createDividerCategory({
	id: classicCategoryId,
	type: "divider",
	authors: [FFGCredits],
	name: "Classic",
	image: "/images/divider/render/classic.avif",
	layouts: classicLayouts,
});

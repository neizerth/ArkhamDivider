import type { DividerCategory } from "@/modules/divider/shared/model";
import { classicCategoryId } from "./common";
import { classicLayouts } from "./layouts";

export const classicCategory: DividerCategory = {
	id: classicCategoryId,
	name: "Classic",
	image: "/images/divider/render/classic.avif",
	layouts: classicLayouts,
};

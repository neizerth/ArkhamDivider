import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { CarlosLemosCredits } from "@/shared/config";
import { carlosLemosCategoryId } from "./common";
import { carlosLemosLayouts } from "./layouts";

export const carlosLemosCategory: DividerCategory = createDividerCategory({
	id: carlosLemosCategoryId,
	type: "divider",
	name: "Carlos Lemos",
	image: "/images/divider/render/carlos-lemos.avif",
	layouts: carlosLemosLayouts,
	authors: [CarlosLemosCredits],
});

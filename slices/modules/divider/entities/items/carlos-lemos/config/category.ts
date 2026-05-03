import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { FFGCredits } from "@/shared/config";
import { carlosLemosCategoryId } from "./common";
import { carlosLemosLayouts } from "./layouts";

export const carlosLemosCategory: DividerCategory = createDividerCategory({
	id: carlosLemosCategoryId,
	type: "divider",
	name: "divider.carlos-lemos.name",
	image: "/images/divider/render/carlos-lemos.avif",
	layouts: carlosLemosLayouts,
	authors: [FFGCredits],
});

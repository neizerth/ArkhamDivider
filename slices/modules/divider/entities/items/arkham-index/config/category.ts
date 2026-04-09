import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { LasTorCredits, VladimirYazykovCredits } from "@/shared/config";
import { arkhamIndexCategoryId } from "./common";
import { arkhamIndexLayouts } from "./layouts";

export const arkhamIndexCategory: DividerCategory = createDividerCategory({
	id: arkhamIndexCategoryId,
	type: "divider",
	name: "Arkham Index",
	image: "/images/divider/render/arkham-index.avif",
	layouts: arkhamIndexLayouts,
	authors: [LasTorCredits, VladimirYazykovCredits],
});

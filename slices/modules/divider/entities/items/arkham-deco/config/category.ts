import { createDividerCategory } from "@/modules/divider/shared/lib/logic/createDividerCategory";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { VladimirYazykovCredits } from "@/shared/config";
import { arkhamDecoCategoryId } from "./common";
import { arkhamDecoLayouts } from "./layouts";

export const arkhamDecoCategory: DividerCategory = createDividerCategory({
	id: arkhamDecoCategoryId,
	type: "divider",
	authors: [VladimirYazykovCredits],
	name: "Arkham Deco",
	image: "/images/divider/render/arkham-deco.avif",
	layouts: arkhamDecoLayouts,
});

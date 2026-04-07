import { createDividerCategory } from "@/modules/divider/shared/lib/logic/createDividerCategory";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { RynoCredits } from "@/shared/config";
import { rynoCategoryId } from "./common";
import { rynoLayouts } from "./layouts";

export const rynoCategory: DividerCategory = createDividerCategory({
	id: rynoCategoryId,
	type: "divider",
	name: "Ryno",
	description: "Ryno Style Dividers",
	image: "/images/divider/render/ryno.avif",
	layouts: rynoLayouts,
	authors: [RynoCredits],
});

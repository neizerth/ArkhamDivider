import { createDividerCategory } from "@/modules/divider/shared/lib/logic/createDividerCategory";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { SarnetskyCredits } from "@/shared/config";
import { sarnetskyCategoryId } from "./common";
import { sarnetskyLayouts } from "./layouts";

export const sarnetskyCategory: DividerCategory = createDividerCategory({
	id: sarnetskyCategoryId,
	type: "divider",
	authors: [SarnetskyCredits],
	name: "Eugene Sarnetsky",
	image: "/images/divider/render/sarnetsky.avif",
	layouts: sarnetskyLayouts,
});

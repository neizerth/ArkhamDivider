import { createDividerCategory } from "@/modules/divider/shared/lib/logic/createDividerCategory";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { SarnetskyCredits } from "@/shared/config";
import { sarnetskyBandCategoryId } from "./common";
import { sarnetskyBandLayouts } from "./layouts";

export const sarnetskyBandCategory: DividerCategory = createDividerCategory({
	id: sarnetskyBandCategoryId,
	type: "band",
	authors: [SarnetskyCredits],
	name: "Eugene Sarnetsky",
	image: "/images/divider/render/sarnetsky-band.avif",
	layouts: sarnetskyBandLayouts,
});

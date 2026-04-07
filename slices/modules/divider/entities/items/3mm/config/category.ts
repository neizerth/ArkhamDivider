import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { ArkhamStarter3mmCredits } from "@/shared/config";
import { arkhamStarterDividerCategoryId } from "./common";
import { arkhamStarterLayouts } from "./layouts";

export const arkhamStarterDividerCategory: DividerCategory =
	createDividerCategory({
		id: arkhamStarterDividerCategoryId,
		type: "divider",
		authors: [ArkhamStarter3mmCredits],
		name: "3mm",
		image: "/images/divider/render/3mm.avif",
		layouts: arkhamStarterLayouts,
	});

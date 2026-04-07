import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { ArkhamesqueCredits } from "@/shared/config";
import { arkhamesqueClassicCategoryId } from "./common";
import { arkhamesqueClassicLayouts } from "./layouts";

export const arkhamesqueClassicCategory: DividerCategory =
	createDividerCategory({
		id: arkhamesqueClassicCategoryId,
		type: "divider",
		authors: [ArkhamesqueCredits],
		name: "Arkhamesque Classic",
		image: "/images/divider/render/arkhamesque.avif",
		layouts: arkhamesqueClassicLayouts,
	});

import { createDividerCategory } from "@/modules/divider/shared/lib";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { VladimirYazykovCredits } from "@/shared/config";
import { investigatorTokensLayouts } from "./layouts";

export const investigatorTokensCategory: DividerCategory =
	createDividerCategory({
		id: "investigator-tokens",
		type: "other",
		name: "Investigator Tokens",
		image: "/images/divider/render/investigator-tokens.avif",
		authors: [VladimirYazykovCredits],
		layouts: investigatorTokensLayouts,
	});

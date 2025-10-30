import type { Author } from "@/shared/model";
import type { DividerLayout, DividerLayoutGroup } from "./layout";

export type DividerCategoryType =
	| "divider"
	| "band"
	| "sticker"
	| "album"
	| "other";

export type DividerCategory = {
	id: string;
	type: DividerCategoryType;
	name: string;
	image: string;
	authors: Author[];
	layouts: DividerLayout[];
	groups: DividerLayoutGroup[];
	hasGrayscale: boolean;
	hasColor: boolean;
	hasVertical: boolean;
	hasHorizontal: boolean;
	hasOrientationVariants: boolean;
	hasColorVariants: boolean;
};

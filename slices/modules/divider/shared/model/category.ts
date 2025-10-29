import type { Author } from "@/shared/model";
import type { DividerLayout, LayoutGroup } from "./layout";

export type DividerCategory = {
	id: string;
	name: string;
	image: string;
	authors: Author[];
	layouts: DividerLayout[];
	groups: LayoutGroup[];
	hasGrayscale: boolean;
	hasColor: boolean;
	hasVertical: boolean;
	hasHorizontal: boolean;
	hasOrientationVariants: boolean;
	hasColorVariants: boolean;
};

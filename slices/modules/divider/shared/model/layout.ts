import type { SleeveSize } from "@/entities/sleeve/model";
import type { Author, BoxPosition, BoxSize } from "@/shared/model";

export type DividerLayoutSleeve = {
	id: string;
	size: SleeveSize;
	description?: string;
};

export type DividerLayout<Params = void> = {
	id: string;
	categoryId: string;
	groupId: string;
	name: string;
	authors?: Author[];
	image?: string;
	orientation: "horizontal" | "vertical";
	color: boolean;
	size: BoxSize;
	position?: Partial<BoxPosition>;
	bleed: number;
	sleeves?: DividerLayoutSleeve[];
	params?: Params;
};

export type LayoutGroup = {
	id: string;
	name: string;
	size: BoxSize;
	layouts: DividerLayout[];
	hasGrayscale: boolean;
	hasColor: boolean;
	canBeSleeved: boolean;
};

import type { SleeveSize } from "@/entities/sleeve/model";
import type { Author, BoxPosition, BoxSize } from "@/shared/model";

export type DividerLayoutSleeve = {
	id: string;
	size: SleeveSize;
	description?: string;
};

export type DividerLayoutType = "scenario" | "player" | "investigator";

export type DividerLayout<Params = void> = {
	id: string;
	types: DividerLayoutType[];
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
	cardCountSupport?: boolean;
	campaignIconSupport?: boolean;
};

export type DividerLayoutGroup = {
	id: string;
	name: string;
	size: BoxSize;
	layouts: DividerLayout[];
	hasGrayscale: boolean;
	hasColor: boolean;
	canBeSleeved: boolean;
};

import type { SleeveSize } from "@/entities/sleeve/model";
import type { DPI } from "@/modules/print/shared/model";
import type { Author, BoxSize } from "@/shared/model";

export type DividerLayoutSleeve = {
	id: string;
	size: SleeveSize;
	description?: string;
};

export type DividerLayoutType = "scenario" | "player" | "investigator";

export type DividerPrintSizeItem = {
	/** The size of the divider in px at the given DPI */
	size: BoxSize;
	/** The size of the bleed in px at the given DPI */
	bleedSize: BoxSize;
};

export type DividerPrintSize = Partial<Record<DPI, DividerPrintSizeItem>>;

export type DividerLayout = {
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
	printSize: DividerPrintSize;
	bleed: number;
	sleeves?: DividerLayoutSleeve[];
	params?: Record<string, unknown>;
	cardCountSupport?: boolean;
	campaignIconSupport?: boolean;
	backgroundSupport?: boolean;
	playerStorySupport?: boolean;
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

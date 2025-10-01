import type { SleeveSize } from "@/entities/sleeve/model";
import type { Bleed } from "@/modules/print/shared/model/bleed";

export type DividerLayoutSleeve = {
	id: string;
	size: SleeveSize;
	description?: string;
};

export type DividerLayout<Params = void> = {
	id: string;
	categoryId: string;
	name: string;
	image?: string;
	orientation: "horizontal" | "vertical";
	color: boolean;
	width: number;
	height: number;
	bleed: Bleed;
	sleeves: DividerLayoutSleeve[];
	params?: Params;
};

import type { SleeveSize } from "@/entities/sleeve/model";
import type { DPI } from "@/modules/print/shared/model";
import type {
	VipsTransformRecord,
	VipsWriteOptionsRecord,
} from "@/modules/render/shared/model";
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

export type DividerOrientation = "horizontal" | "vertical";

export type DividerLayout<Params = Record<string, unknown>> = {
	id: string;
	types: DividerLayoutType[];
	description?: string;
	categoryId: string;
	groupId: string;
	name: string;
	previewName?: string;
	authors?: Author[];
	image?: string;
	orientation: DividerOrientation;
	color: boolean;
	size: BoxSize;
	printSize: DividerPrintSize;
	bleed: number;
	sleeves?: DividerLayoutSleeve[] | null;
	params?: Params;
	background?: boolean;
	iconParams?: string[];
	creasingTop?: number;
	scenarioParams?: {
		campaignIcon?: boolean;
		cardCount?: boolean;
	};
	playerParams?: {
		story?: boolean;
		numericXP?: boolean;
		sideXP?: boolean;
	};
	investigatorParams?: {
		doubleSided?: boolean;
		duplicateCodes?: Record<string, number>;
	};
	additionalParams?: {
		singleSide?: boolean;
	};
	renderOptions?: DividerLayoutRenderOptions;
	compatibility?: Partial<DividerLayoutCompatibility> | null;
	tabs?: DividerLayoutTabConfig;
};

export type DividerLayoutTabConfig =
	| {
			type: "fixed";
			value: number;
	  }
	| {
			type: "variable";
			min: number;
			max: number;
			initial: number;
	  };

export type DividerLayoutCompatibility = {
	chapter1Box: boolean;
	chapter2Box: boolean;
	deckBox: boolean;
};

export type DividerLayoutRenderOptions = {
	writeOptionsRecord?: VipsWriteOptionsRecord;
	transformRecord?: VipsTransformRecord;
};

export type DividerLayoutGroup = {
	id: string;
	name: string;
	size: BoxSize;
	layouts: DividerLayout[];
	hasGrayscale: boolean;
	hasColor: boolean;
	canBeSleeved: boolean;
	compatibility: DividerLayoutCompatibility;
};

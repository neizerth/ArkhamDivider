import type { ArkhamDivider } from "arkham-divider-data";
import type { MediaItem } from "@/modules/core/media/shared/model";
import type { BoxRect, Single } from "@/shared/model";

export type ArkhamDividerIcon = Single<ArkhamDivider.Core["icons"]> & {
	encounter_set_code?: string;
	pack_code?: string;
	cycle_code?: string;
};
export type IconMapping = Record<string, ArkhamDividerIcon>;

export type IconScaleType = "circle" | "square" | false;

export type MediaIcon = MediaItem & {
	fallback?: string | null;
	ratio: number;
};

export type RenderedMediaIcon = MediaIcon & {
	blob: Blob;
};

export type Icon = string | MediaIcon;

export type IconScaleFactor = {
	all?: number;
	circled?: number;
	regular?: number;
};

export type IconName = string;

export type IconPositionManifest = Record<IconName, IconPosition>;

export type IconPosition = {
	scale?: number;
	left?: number;
	top?: number;
};

export type OnIconSelectedCallback = (icon: Icon | null) => void;

export type IconRect = BoxRect & {
	id: string;
	icon: string;
};

export type IconSelectionMode = "preview" | "selection";

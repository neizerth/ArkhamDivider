import type { ArkhamDivider } from "arkham-divider-data";
import type { Single } from "@/shared/model";

export type ArkhamDividerIcon = Single<ArkhamDivider.Core["icons"]>;
export type IconMapping = Record<string, ArkhamDividerIcon>;

export type IconScaleType = "circle" | "square" | false;

export type Icon = {
	type: "font" | "media";
	icon: string;
};

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

export type OnIconSelectedCallback = (icon: string | null) => void;

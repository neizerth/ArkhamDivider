import type { ArkhamDivider } from "arkham-divider-data";
import type { Single } from "@/shared/model";

export type Icon = Single<ArkhamDivider.Core["icons"]>;
export type IconMapping = Record<string, Icon>;

export type IconScaleType = "circle" | "square" | false;

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

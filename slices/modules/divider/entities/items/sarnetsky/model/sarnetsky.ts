import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type {
	BaseIconProps,
	Icon,
	IconRect,
} from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerOrientation,
	DividerType,
	DividerWithRelations,
	XPCost,
} from "@/modules/divider/shared/model";
import type { Faction } from "@/modules/faction/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { BoxRect } from "@/shared/model";
import type { getSarnetskyLayoutObjects } from "../lib";

export type SarnetskyDividerParams = {
	customTitle?: string;
	scenarioSubtitle?: string;
	frameColor?: string;
	overlayColor?: string;
	background?: Icon;
	scenarioEncounters?: IconRect[];
	backgroundIconRect?: BoxRect;
};

export type SarnetskyLayout = DividerLayout;

export type SarnetskyDividerProps =
	DividerWithRelations<SarnetskyDividerParams>;

export type SarnetskyIcon = {
	id: string;
	type: DividerType;
	fontSize: number;
	height: number;
	width: number;
	right: number;
	top: number;
	light?: boolean;
	params?: BaseIconProps;
};

export type SarnetskyIconRecord = Partial<Record<DividerType, SarnetskyIcon[]>>;

export type SarnetskyTextPosition = {
	top: number;
	left: number;
	right: number;
};

export type SarnetskyDividerObjects = ReturnType<
	typeof getSarnetskyLayoutObjects
>;

export type SarnetskyDividerCallbackProps = {
	orientation: DividerOrientation;
	objects: SarnetskyDividerObjects;
	type: DividerType;
	faction?: Faction | null;
	xpCost?: XPCost | null;
};

export type SarnetskyDividerLocaleCallback =
	LocaleSxCallback<SarnetskyDividerCallbackProps>;

export type SarnetskyDividerSxCallback =
	PrintSxCallback<SarnetskyDividerCallbackProps>;

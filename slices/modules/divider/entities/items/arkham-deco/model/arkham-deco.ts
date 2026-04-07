import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerType,
	DividerWithRelations,
	XPCost,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getArkhamDecoLayoutObjects } from "../lib";

export type ArkhamDecoDividerParams = {
	customTitle?: string;
	smallIcon?: Icon | null;
	campaignIcon?: Icon | null;
	backgroundIcon?: Icon | null;
	secondaryIcon?: Icon | null;
	overlayColor?: string | null;
};

export type ArkhamDecoDividerSxOptions = {
	objects: ArkhamDecoLayoutObjects;
	type?: DividerType;
	xpCost?: XPCost | null;
	sideXP?: boolean;
	tab?: boolean;
	withCentralIcon?: boolean;
};

export type ArkhamDecoLayoutParams = {
	tab?: boolean;
};

export type ArkhamDecoPosition = "left" | "right";

export type ArkhamDecoDividerProps =
	DividerWithRelations<ArkhamDecoDividerParams>;

export type ArkhamDecoDividerLayout = DividerLayout<ArkhamDecoLayoutParams>;

export type ArkhamDecoLayoutObjects = ReturnType<
	typeof getArkhamDecoLayoutObjects
>;

export type ArkhamDecoDividerSxCallback<T = object> = PrintSxCallback<
	ArkhamDecoDividerSxOptions & T
>;

export type ArkhamDecoDividerLocaleSxCallback =
	LocaleSxCallback<ArkhamDecoDividerSxOptions>;

export type ArkhamDecoIcon = {
	icon?: Icon | null;
	param: string;
	defaultIcon?: Icon | null;
};

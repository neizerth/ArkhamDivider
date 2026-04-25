import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getArkhamIndexDividerLayoutObjects } from "../lib";

export type ArkhamIndexDividerTabSize = number | "full";

export type ArkhamIndexDividerProps = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;

	tabSize?: ArkhamIndexDividerTabSize;
	tabIndex?: number;
}>;

export type ArkhamIndexDividerLayout = DividerLayout<{
	size: "compact" | "large";
}>;

export type ArkhamIndexDividerLayoutObjects = ReturnType<
	typeof getArkhamIndexDividerLayoutObjects
>;

export type ArkhamIndexDividerSxOptions = {
	objects: ArkhamIndexDividerLayoutObjects;
	showIcon: boolean;
	tabIndex: number;
	tabSize: ArkhamIndexDividerTabSize;
};

export type ArkhamIndexDividerSxCallback<T = object> = PrintSxCallback<
	ArkhamIndexDividerSxOptions & T
>;

export type ArkhamIndexDividerIconLocaleSxCallback<T = object> =
	LocaleSxCallback<ArkhamIndexDividerSxOptions & T>;

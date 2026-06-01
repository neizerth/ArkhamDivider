import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { Faction } from "@/modules/faction/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { FontFamily } from "@/shared/model";
import type { getArkhamIndexDividerLayoutObjects } from "../lib";

export type ArkhamIndexDividerTabSize = number | "full";

export type ArkhamIndexDividerParams = {
	icon?: Icon | null;
	tabTitle?: string | null;
	tabTitleFontSizeScale?: number;

	customTitle?: string | null;
	customImage?: string | null;
	custonFontSizeScale?: number;
	sideTextFontSizeScale?: number;

	tabSize?: ArkhamIndexDividerTabSize;
	tabIndex?: number;
	indent?: boolean;

	color?: string;
};

export type ArkhamIndexDividerProps =
	DividerWithRelations<ArkhamIndexDividerParams>;

export type ArkhamIndexDividerLayout = DividerLayout<{
	title: boolean;
	fontFamily?: FontFamily;
}>;

export type ArkhamIndexDividerLayoutObjects = ReturnType<
	typeof getArkhamIndexDividerLayoutObjects
>;

export type ArkhamIndexDividerSxOptions = {
	objects: ArkhamIndexDividerLayoutObjects;
	showIcon: boolean;
	tabIndex: number;
	tabSize: ArkhamIndexDividerTabSize;
	indentSize: number;
	faction: Faction;
};

export type ArkhamIndexDividerSxCallback<T = object> = PrintSxCallback<
	ArkhamIndexDividerSxOptions & T
>;

export type ArkhamIndexDividerIconLocaleSxCallback<T = object> =
	LocaleSxCallback<ArkhamIndexDividerSxOptions & T>;

export type ArkhamIndexDividerData = {
	supported_stories: string[];
	investigator_alternatives: Record<string, number>;
};

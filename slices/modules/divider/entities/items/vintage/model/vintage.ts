import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getVintageDividerObjects } from "../lib";

export type VintageDividerParams = {
	icon?: Icon;
	customTitle?: string;
	customTopTitle?: string;
	tabColor?: string;
	tabIndex?: number;
	topTitleFontSizeScale?: number;
	fontSizeScale?: number;
};

export type VintageDividerProps = DividerWithRelations<VintageDividerParams>;

export type VintageDividerLayoutParams = {
	tabWidth: number;
};

export type VintageDividerLayout = DividerLayout<VintageDividerLayoutParams>;

export type VintageDividerObjects = ReturnType<typeof getVintageDividerObjects>;

export type VintageDividerSxOptions = {
	objects: VintageDividerObjects;
};

export type VintageDividerSxCallback<T = void> = PrintSxCallback<
	VintageDividerSxOptions & T
>;

export type VintageDividerLocaleSxCallback =
	LocaleSxCallback<VintageDividerSxOptions>;

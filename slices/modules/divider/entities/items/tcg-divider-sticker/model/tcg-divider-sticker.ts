import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getTCGDividerStickerLayoutObjects } from "../lib/logic/objects/getTCGDividerStickerLayoutObjects";
export type TCGDividerStickerProps = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;
}>;

export type TCGDividerStickerLayout = DividerLayout<{
	cut?: boolean;
	dividerType?: "70x95" | "70x107";
}>;

export type TCGDividerStickerSxOptions = {
	objects: ReturnType<typeof getTCGDividerStickerLayoutObjects>;
};

export type TCGDividerStickerSxCallback<T = void> = PrintSxCallback<
	TCGDividerStickerSxOptions & T
>;

export type TCGDividerStickerLocaleSxCallback<T = void> = LocaleSxCallback<
	TCGDividerStickerSxOptions & T
>;

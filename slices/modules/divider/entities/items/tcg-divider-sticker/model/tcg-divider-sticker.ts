import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";

export type TCGDividerStickerProps = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;
}>;

export type TCGDividerStickerLayout = DividerLayout<{
	cut?: boolean;
}>;

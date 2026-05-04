import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type CarlosLemosDividerProps = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;

	extraIcons?: Icon[] | null;
}>;

export type CarlosLemosDividerParams =
	DividerWithRelations<CarlosLemosDividerProps>;

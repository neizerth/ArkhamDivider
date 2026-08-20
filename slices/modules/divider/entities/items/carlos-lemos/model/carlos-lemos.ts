import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type CarlosLemosDividerProps = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;
	scenarioNumberFontSizeScale?: number;
	backgroundColor?: string;
	extraIcons?: Icon[] | null;
}>;

export type CarlosLemosDividerParams =
	DividerWithRelations<CarlosLemosDividerProps>;

export type CarlosLemosSxOptions = {
	backgroundType: "scenario" | "encounter";
};

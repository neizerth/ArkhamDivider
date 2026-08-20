import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type CarlosLemosDividerParams = DividerWithRelations<{
	icon?: Icon | null;
	customTitle?: string | null;
	custonFontSizeScale?: number;
	scenarioNumberFontSizeScale?: number;
	backgroundColor?: string;
	encounterIcons?: Icon[] | null;
}>;

export type CarlosLemosSxOptions = {
	backgroundType: "scenario" | "encounter";
};

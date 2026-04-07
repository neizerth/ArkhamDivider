import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import type { BoxRect } from "@/shared/model";
import type { get3mmDividerTitleObject } from "../lib";

export type ArkhamStarterDividerParams = {
	icon?: Icon;
	playerIcon?: Icon;
	iconRect?: BoxRect;
	customTitle?: string;
	customStoryTitle?: string;
	customStoryTitleFontSizeScale?: number;
	customXP?: string;
	customXPFontSizeScale?: number;
	playerCornerColor?: string;
	stripColor?: string;
};

export type ArkhamStarterDividerProps =
	DividerWithRelations<ArkhamStarterDividerParams>;

export type ArkhamStarterDividerTitleObject = ReturnType<
	typeof get3mmDividerTitleObject
>;

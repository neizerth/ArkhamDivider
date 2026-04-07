import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type ArkhamesqueClassicDividerParams = {
	icon?: Icon | null;
	customTitle?: string;
	bottomIcon?: Icon | null;
	/** FitText font size scale (%) for scenario number badge. */
	scenarioNumberScale?: number;
};

export type ArkhamesqueClassicDividerProps =
	DividerWithRelations<ArkhamesqueClassicDividerParams>;

import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type Chapter2DividerProps = DividerWithRelations<{
	color?: string;
	icon?: Icon | null;
	backgroundIcon?: Icon | null;
}>;

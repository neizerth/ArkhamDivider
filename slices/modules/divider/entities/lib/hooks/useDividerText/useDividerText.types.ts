import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type UseDividerTextOptions<T> = {
	divider: DividerWithRelations<T>;
	defaultValue?: string;
	param: string;
	fontSizeScaleParam?: string;
	custom?: boolean;
};

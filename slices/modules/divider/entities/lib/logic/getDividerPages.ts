import type { DividerWithRelations } from "@/modules/divider/shared/model";
import type { PageFormat } from "@/modules/print/shared/model";

type Options = {
	pageFormat: PageFormat;
	dividers: DividerWithRelations[];
	doubleSided: boolean;
};

export const getDividerPages = (_options: Options) => {};

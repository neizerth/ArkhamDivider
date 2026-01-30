import { prop } from "ramda";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import type { DividerCategory, DividerWithRelations } from "../../shared/model";
import { classicCategory } from "./classic/config";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDivider, ClassicDividerPDF } from "./classic/ui";

export const dividerCategories: DividerCategory[] = [classicCategory];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));

export const dividerComponents: Record<
	string,
	// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
	React.ComponentType<DividerWithRelations<any>>
> = {
	[classicCategoryId]: ClassicDivider,
};

// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
export const dividerPDFComponents: Record<string, PDFDivider<any>> = {
	[classicCategoryId]: ClassicDividerPDF,
};

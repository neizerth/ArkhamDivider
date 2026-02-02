import type { PDFDivider } from "@/modules/pdf/shared/model";
import type { DividerWithRelations } from "../../shared/model";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDivider, ClassicDividerPDF } from "./classic/ui";
import { dividerCategories, dividerLayouts } from "./data";

export { dividerCategories, dividerLayouts };

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

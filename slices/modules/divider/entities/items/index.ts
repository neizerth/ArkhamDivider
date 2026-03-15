import type { PDFDivider } from "@/modules/pdf/shared/model";
import type { DividerWithRelations } from "../../shared/model";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDivider, ClassicDividerPDF } from "./classic/ui";
import { dividerCategories, dividerLayouts } from "./data";
import { invocation2018CategoryId } from "./invocation2018/config/common";
import { Invocation2018Divider } from "./invocation2018/ui";

export { dividerCategories, dividerLayouts };

export const dividerComponents: Record<
	string,
	// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
	React.ComponentType<DividerWithRelations<any>>
> = {
	[classicCategoryId]: ClassicDivider,
	[invocation2018CategoryId]: Invocation2018Divider,
};

// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
export const dividerPDFComponents: Record<string, PDFDivider<any>> = {
	[classicCategoryId]: ClassicDividerPDF,
};

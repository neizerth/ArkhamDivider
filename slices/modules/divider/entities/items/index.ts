import { prop } from "ramda";
import type { DividerRender } from "@/modules/render/shared/model";
import type { DividerCategory, DividerWithRelations } from "../../shared/model";
import { classicCategory } from "./classic/config";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDivider, ClassicDividerPDF } from "./classic/ui";

export const dividerCategories: DividerCategory[] = [classicCategory];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));

export const dividerComponents: Record<
	string,
	React.ComponentType<DividerWithRelations>
> = {
	[classicCategoryId]: ClassicDivider,
};

export const dividerPDFComponents: Record<
	string,
	React.ComponentType<DividerRender>
> = {
	[classicCategoryId]: ClassicDividerPDF,
};

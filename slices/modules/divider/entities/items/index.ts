import { prop } from "ramda";
import type { DividerCategory, DividerWithRelations } from "../../shared/model";
import { classicCategory } from "./classic/config";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDivider } from "./classic/ui";

export const dividerCategories: DividerCategory[] = [classicCategory];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));

export const dividerComponents: Record<
	string,
	React.ComponentType<DividerWithRelations>
> = {
	[classicCategoryId]: ClassicDivider,
};

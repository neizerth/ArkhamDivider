import { prop } from "ramda";
import type { DividerCategory } from "../../shared/model";
import { classicCategory } from "./classic/config";

export const dividerCategories: DividerCategory[] = [classicCategory];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));

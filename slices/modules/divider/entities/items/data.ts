import { prop } from "ramda";
import type { DividerCategory } from "../../shared/model";
import { classicCategory } from "./classic/config";
import { invocation2018Category } from "./invocation2018/config/category";

/** Categories/layouts only — no UI imports. Use this from shared to avoid circular deps. */
export const dividerCategories: DividerCategory[] = [
	classicCategory,
	invocation2018Category,
];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));

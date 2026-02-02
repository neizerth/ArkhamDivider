import { prop } from "ramda";
import type { DividerCategory } from "../../shared/model";
import { classicCategory } from "./classic/config";

/** Categories/layouts only — no UI imports. Use this from shared to avoid circular deps. */
export const dividerCategories: DividerCategory[] = [classicCategory];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));

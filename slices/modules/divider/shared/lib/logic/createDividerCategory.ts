import { getAssetUrl } from "@/shared/util";
import type { DividerCategory } from "../../model";
import { createLayoutGroups } from "./createLayoutGroups";

type Options = Omit<DividerCategory, "groups">;

export const createDividerCategory = (options: Options): DividerCategory => {
	return {
		...options,
		image: getAssetUrl(options.image),
		groups: createLayoutGroups(options.layouts),
	};
};

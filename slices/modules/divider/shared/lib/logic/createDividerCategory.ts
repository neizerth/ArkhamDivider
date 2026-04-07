import { propEq } from "ramda";
import { getAssetUrl } from "@/shared/util";
import type { DividerCategory } from "../../model";
import { createLayoutGroups } from "./createLayoutGroups";

type Options = Omit<
	DividerCategory,
	| "groups"
	| "hasGrayscale"
	| "hasColor"
	| "hasVertical"
	| "hasHorizontal"
	| "hasOrientationVariants"
	| "hasColorVariants"
>;

export const createDividerCategory = (options: Options): DividerCategory => {
	const hasGrayscale = options.layouts.some(propEq(false, "color"));
	const hasColor = options.layouts.some(propEq(true, "color"));
	const hasVertical = options.layouts.some(propEq("vertical", "orientation"));
	const hasHorizontal = options.layouts.some(
		propEq("horizontal", "orientation"),
	);

	const hasColorVariants = hasColor && hasGrayscale;
	const hasOrientationVariants = hasVertical && hasHorizontal;

	const groups = createLayoutGroups(options.layouts);
	const image = getAssetUrl(options.image);

	return {
		...options,
		image,
		groups,
		hasGrayscale,
		hasColor,
		hasVertical,
		hasHorizontal,
		hasOrientationVariants,
		hasColorVariants,
	};
};

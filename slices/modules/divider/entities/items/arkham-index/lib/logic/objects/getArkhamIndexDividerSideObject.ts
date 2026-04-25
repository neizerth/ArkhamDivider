import type {
	ArkhamIndexDividerLayoutObjects,
	ArkhamIndexDividerProps,
} from "../../../model";

type Options = {
	objects: ArkhamIndexDividerLayoutObjects;
	divider: ArkhamIndexDividerProps;
};
export const getArkhamIndexDividerSideObject = (options: Options) => {
	const { objects, divider } = options;
	if (divider.type === "player" && divider.xpCost) {
		return {
			...objects.sideText,
			...objects.sideText.withXP,
		};
	}
	return objects.sideText;
};

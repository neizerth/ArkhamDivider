import type { ArkhamDecoLayoutObjects } from "../../../model";

type Options = {
	objects: ArkhamDecoLayoutObjects;
	numericXP?: boolean;
};
export const getSideXPObject = (props: Options) => {
	const { objects, numericXP } = props;

	if (numericXP) {
		return {
			...objects.sideXp,
		};
	}

	return {
		...objects.sideXp,
		...objects.sideXp.withoutNumericXP,
	};
};

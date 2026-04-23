import type { PlayerCardType } from "@/modules/divider/shared/model";
import type { ClassicDividerObjects } from "../model";

type Options = {
	objects: ClassicDividerObjects;
	cardType?: PlayerCardType | null;
};
export const getClassicDividerXPObject = (options: Options) => {
	const { objects, cardType } = options;
	if (cardType === "skill") {
		return {
			...objects.xp.container,
			...objects.xp.skill,
		};
	}
	return objects.xp.container;
};

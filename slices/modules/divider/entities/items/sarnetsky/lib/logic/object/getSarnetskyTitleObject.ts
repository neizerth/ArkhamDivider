import type { DividerType, XPCost } from "@/modules/divider/shared/model";
import type { SarnetskyDividerObjects } from "../../../model";

type Options = {
	objects: SarnetskyDividerObjects;
	type: DividerType;
	xpCost?: XPCost | null;
};

export const getSarnetskyTitleObject = ({
	objects: O,
	type,
	xpCost,
}: Options) => {
	return {
		...O.title.default,
		...O.title[type],
		...(xpCost ? O.title.xp : {}),
	};
};

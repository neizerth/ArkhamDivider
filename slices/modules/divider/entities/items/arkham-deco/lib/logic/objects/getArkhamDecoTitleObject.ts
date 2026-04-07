import type { DividerType, XPCost } from "@/modules/divider/shared/model";
import type { ArkhamDecoLayoutObjects } from "../../../model";

type Options = {
	type?: DividerType;
	objects: ArkhamDecoLayoutObjects;
	xpCost?: XPCost | null;
	sideXP?: boolean;
	withCentralIcon?: boolean;
};
export const getArkhamDecoTitleObject = ({
	type,
	objects,
	xpCost,
	sideXP,
	withCentralIcon,
}: Options) => {
	const base = {
		...objects.title.default,
		...(withCentralIcon ? objects.title.withCentralIcon : {}),
	};

	switch (type) {
		case "campaign":
		case "scenario":
			return {
				...base,
				...objects.title[type],
			};
	}

	if (type === "player" && xpCost && sideXP) {
		return {
			...base,
			...objects.title.xp,
		};
	}

	return base;
};

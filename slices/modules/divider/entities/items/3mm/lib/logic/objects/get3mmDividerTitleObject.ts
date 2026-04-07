import { mergeDeepRight } from "ramda";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import {
	arkhamStarterLayoutObjects as O,
	arkhamStarterSharedPositions as P,
} from "../../../config";
import type { ArkhamStarterDividerProps } from "../../../model";

type BaseTitleObject = typeof O.title;
type TitleObject = BaseTitleObject & {
	playerIconLeft: number;
	vertical: BaseTitleObject["vertical"] & {
		playerIconLeft: number;
	};
};

function withPlayerIconLeft(T: BaseTitleObject): TitleObject {
	return {
		...T,
		playerIconLeft: T.left - O.storyIcon.width - P.storyIconGapLeft,
		vertical: {
			...T.vertical,
			playerIconLeft: T.vertical.left - O.storyIcon.width - P.storyIconGapLeft,
		},
	};
}

export const get3mmDividerTitleObject = (
	divider: ArkhamStarterDividerProps,
): TitleObject => {
	const base = O.title;

	if (divider.layoutType === "scenario") {
		return withPlayerIconLeft(base);
	}

	const xpCost = getDividerXPCost(divider);

	const maybeXP = mergeDeepRight(
		base,
		xpCost ? O.title.xp : {},
	) as BaseTitleObject;

	if (divider.layoutType === "player" && divider.story) {
		const result = mergeDeepRight(
			maybeXP,
			O.title.withPlayerStory,
		) as BaseTitleObject;

		const customIcon = divider.params?.icon;
		const vertical = customIcon
			? {
					left: O.title.vertical.withIcon.left,
				}
			: {
					left: O.title.default.vertical.left,
				};

		const merged = mergeDeepRight(result, {
			vertical,
		}) as BaseTitleObject;
		return withPlayerIconLeft(merged);
	}

	return withPlayerIconLeft(maybeXP);
};

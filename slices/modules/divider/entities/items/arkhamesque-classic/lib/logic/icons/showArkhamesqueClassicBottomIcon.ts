import type { ArkhamesqueClassicDividerProps } from "../../../model";

export const showArkhamesqueClassicBottomIcon = (
	props: ArkhamesqueClassicDividerProps,
) => {
	if (props.layoutType === "scenario") {
		return true;
	}
	if (props.layoutType === "investigator") {
		return false;
	}

	const { faction, subtype, cardType } = props;

	if (subtype && ["weakness", "basic_weakness", "bonded"].includes(subtype)) {
		return false;
	}

	if (faction === "neutral") {
		return false;
	}

	if (faction === "multiclass") {
		if (!cardType) {
			return false;
		}

		if (["event", "skill"].includes(cardType)) {
			return false;
		}

		return true;
	}

	if (subtype === "faction") {
		return false;
	}

	return true;
};

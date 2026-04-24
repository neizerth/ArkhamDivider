import type {
	ArkhamIndexDividerProps,
	ArkhamIndexDividerTabSize,
} from "../../model";

export const getArkhamIndexDividerTabSize = (
	divider: ArkhamIndexDividerProps,
): ArkhamIndexDividerTabSize => {
	return divider.params?.tabSize ?? getDefaultTabSize(divider);
};

const getDefaultTabSize = (
	divider: ArkhamIndexDividerProps,
): ArkhamIndexDividerTabSize => {
	if (divider.type === "campaign") {
		return 3;
	}

	if (
		divider.type === "player" &&
		divider.subtype &&
		["investigators", "faction"].includes(divider.subtype)
	) {
		return 2;
	}

	return 1;
};

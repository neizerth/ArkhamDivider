import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
	ArkhamIndexDividerTabSize,
} from "../../model";

type Options = {
	layout: ArkhamIndexDividerLayout;
	divider: ArkhamIndexDividerProps;
};

export const getArkhamIndexDividerTabSize = ({
	divider,
	layout,
}: Options): ArkhamIndexDividerTabSize => {
	if (layout.params?.title === false) {
		return "full";
	}
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

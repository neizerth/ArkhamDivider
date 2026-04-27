import type {
	ArkhamIndexDividerProps,
	ArkhamIndexDividerTabSize,
} from "../../model";

type Options = {
	divider: ArkhamIndexDividerProps;
	tabIndex: number;
	tabSize: ArkhamIndexDividerTabSize;
	/** From `getArkhamIndexDividerLayoutObjects(…).tab.indentSize` (mm). */
	tabIndentSize: number;
};

/**
 * Horizontal offset for tab column when “indent” is on (only for 2-tab layout, not the first tab).
 * Matches {@link useArkhamIndexDividerSxOptions} / {@link getArkhamIndexDividerIconLeft}.
 */
export const getArkhamIndexDividerTabIndentSize = ({
	divider,
	tabIndex,
	tabSize,
	tabIndentSize,
}: Options): number => {
	const indent = divider.params?.indent ?? false;
	if (!indent || tabSize !== 2 || tabIndex === 0) {
		return 0;
	}
	return tabIndentSize;
};

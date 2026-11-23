import type { ArkhamIndexDividerProps } from "../../../model";

export const hasArkhamIndexDividerArt = (divider: ArkhamIndexDividerProps) =>
	Boolean(
		divider.story?.supported ||
			(divider.type === "encounter" && divider.isExtra),
	);

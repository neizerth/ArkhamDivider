import type { DividerLayoutType } from "../../model";

export const getDividerType = (dividerType?: DividerLayoutType | null) => {
	return dividerType ?? "scenario";
};

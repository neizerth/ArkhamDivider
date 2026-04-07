import type { ArkhamDecoDividerLayout } from "../../model";

export const isArkhamDecoCompactLayout = ({
	params,
	orientation,
}: ArkhamDecoDividerLayout) => {
	return params?.tab || orientation === "vertical";
};

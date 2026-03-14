import { useTheme } from "@mui/material/styles";
import { useCallback } from "react";
import type { IconGroup } from "../../model";
import { getGroupHeightForWidth } from "../logic/height";

type Options = {
	containerWidth: number;
};

export const useIconGroupHeight = ({ containerWidth }: Options) => {
	const theme = useTheme();
	const em = theme.typography.fontSize;

	return useCallback(
		(group: IconGroup) => getGroupHeightForWidth(group, containerWidth, em),
		[em, containerWidth],
	);
};

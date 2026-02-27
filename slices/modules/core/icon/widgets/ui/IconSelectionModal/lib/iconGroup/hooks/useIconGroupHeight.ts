import { useTheme } from "@mui/material/styles";
import { useCallback } from "react";
import { GROUP_HEADER_HEIGHT, ICON_GROUP_SIZE } from "../../../config";
import type { IconGroup, IconSubgroup } from "../../../model";

type Options = {
	containerWidth: number;
};

export const useIconGroupHeight = ({ containerWidth }: Options) => {
	const theme = useTheme();
	const em = theme.typography.fontSize;

	return useCallback(
		(group: IconGroup) => {
			const gap = em;

			const columnsCount = Math.floor(containerWidth / (ICON_GROUP_SIZE + gap));

			const subgroupHeight =
				group.groups.reduce((acc, subgroup) => {
					return acc + getSubgroupHeight({ em, subgroup, columnsCount });
				}, 0) +
				gap * (group.groups.length - 1);

			const totalHeight = subgroupHeight + GROUP_HEADER_HEIGHT + gap;

			return totalHeight;
		},
		[em, containerWidth],
	);
};

const getSubgroupHeight = ({
	em,
	subgroup,
	columnsCount,
}: {
	em: number;
	columnsCount: number;
	subgroup: IconSubgroup;
}) => {
	const gap = em;

	const iconsCount = subgroup.icons.length;

	const rowsCount = Math.ceil(iconsCount / columnsCount);

	const headerHeight = subgroup.name ? GROUP_HEADER_HEIGHT + gap : 0;

	return headerHeight + rowsCount * ICON_GROUP_SIZE + gap * (rowsCount - 1);
};

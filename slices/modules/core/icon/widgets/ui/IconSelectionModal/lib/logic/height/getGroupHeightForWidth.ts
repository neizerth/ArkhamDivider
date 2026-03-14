import { GROUP_HEADER_HEIGHT, ICON_GROUP_SIZE } from "../../../config";
import type { IconGroup } from "../../../model";
import { getSubgroupHeight } from "./getSubgroupHeight";

/** Pure height for one group given width and em; used for initial scroll before rect is ready. */
export function getGroupHeightForWidth(
	group: IconGroup,
	containerWidth: number,
	em: number,
): number {
	const gap = em;
	const columnsCount = Math.max(
		1,
		Math.floor(containerWidth / (ICON_GROUP_SIZE + gap)),
	);
	const subgroupHeight =
		group.groups.reduce((acc, subgroup) => {
			return acc + getSubgroupHeight({ em, subgroup, columnsCount });
		}, 0) +
		gap * (group.groups.length - 1);
	return subgroupHeight + GROUP_HEADER_HEIGHT + gap;
}

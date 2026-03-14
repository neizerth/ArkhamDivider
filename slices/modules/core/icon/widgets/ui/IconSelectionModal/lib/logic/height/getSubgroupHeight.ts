import { GROUP_HEADER_HEIGHT, ICON_GROUP_SIZE } from "../../../config";
import type { IconSubgroup } from "../../../model";

export function getSubgroupHeight({
	em,
	subgroup,
	columnsCount,
}: {
	em: number;
	columnsCount: number;
	subgroup: IconSubgroup;
}): number {
	const gap = em;
	const iconsCount = subgroup.icons.length;
	const rowsCount = Math.ceil(iconsCount / columnsCount);
	const headerHeight = subgroup.name ? GROUP_HEADER_HEIGHT + gap : 0;
	return headerHeight + rowsCount * ICON_GROUP_SIZE + gap * (rowsCount - 1);
}

import type { IconGroup } from "../../../model";

export function findGroupIndexByIcon(
	groups: IconGroup[],
	iconId: string | null,
): number {
	if (!iconId) {
		return 0;
	}
	const i = groups.findIndex(({ groups }) =>
		groups.some(({ icons }) => icons.includes(iconId)),
	);
	return i >= 0 ? i : 0;
}

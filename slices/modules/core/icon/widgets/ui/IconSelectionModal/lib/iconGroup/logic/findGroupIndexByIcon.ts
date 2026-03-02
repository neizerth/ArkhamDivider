import { isString } from "ramda-adjunct";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { IconGroup } from "../../../model";

export function findGroupIndexByIcon(
	groups: IconGroup[],
	iconId: Icon | null,
): number {
	if (!iconId || !isString(iconId)) {
		return 0;
	}
	const i = groups.findIndex(({ groups }) =>
		groups.some(({ icons }) => icons.includes(iconId)),
	);
	return i >= 0 ? i : 0;
}

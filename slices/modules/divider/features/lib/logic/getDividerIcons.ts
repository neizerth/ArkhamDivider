import { isNotNil } from "ramda";
import { isObject } from "ramda-adjunct";
import type { Icon } from "@/modules/core/icon/shared/model";
import type { Divider } from "@/modules/divider/shared/model";

type Options = {
	divider: Divider;
	iconParams: string[];
};

type DividerParams = Record<string, unknown>;

export function getDividerIcons({ divider, iconParams }: Options) {
	const params = divider.params as DividerParams | undefined;
	if (!isObject(params)) {
		return [] as Icon[];
	}
	return iconParams
		.map((param) => params[param] as Icon | undefined)
		.filter(isNotNil);
}

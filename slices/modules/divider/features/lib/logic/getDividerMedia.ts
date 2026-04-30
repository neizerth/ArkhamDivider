import { isNotNil } from "ramda";
import { isObject } from "ramda-adjunct";
import type { Divider } from "@/modules/divider/shared/model";

type Options = {
	divider: Divider;
	mediaParams: string[];
};

type DividerParams = Record<string, unknown>;

export function getDividerMedia({ divider, mediaParams }: Options) {
	const params = divider.params as DividerParams | undefined;
	if (!isObject(params)) {
		return [] as string[];
	}
	return mediaParams
		.map((param) => params[param] as string | undefined)
		.filter(isNotNil);
}

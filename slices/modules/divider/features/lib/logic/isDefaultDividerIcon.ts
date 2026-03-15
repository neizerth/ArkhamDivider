import type { Icon } from "@/modules/core/icon/shared/model";
import type { Divider } from "@/modules/divider/shared/model";

type Options = {
	divider: Divider;
	param: string;
};
export const isDefaultDividerIcon = (options: Options) => {
	const { divider, param } = options;
	const params = divider.params as unknown as Record<string, unknown>;
	const icon = params?.[param] as Icon | undefined;

	return !icon || icon === divider.icon;
};

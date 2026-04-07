import type { Icon } from "@/modules/core/icon/shared/model";
import type { Divider } from "@/modules/divider/shared/model";

type Options = {
	divider: Divider<unknown>;
	param: string;
	defaultIcon?: Icon | null;
};
export const getDividerIcon = ({ divider, param, defaultIcon }: Options) => {
	const params = divider.params as Record<string, unknown>;
	const customIcon = params?.[param];
	const icon = (customIcon ?? defaultIcon) as Icon | undefined;
	return icon;
};

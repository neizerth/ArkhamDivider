import { omit, pick } from "ramda";

export const extract = <T>(keys: (keyof T)[], item: T) =>
	[pick(keys, item), omit(keys, item)] as const;

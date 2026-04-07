import { omit, pick } from "ramda";

export const extract = <T>(keys: (keyof T)[], item: T) =>
	[pick(keys, item), omit(keys, item)] as const;

export const withIf = <T extends object>(
	condition: boolean,
	value: T,
): T | Record<string, never> => (condition ? value : {});

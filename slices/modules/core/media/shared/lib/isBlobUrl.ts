import { isString } from "ramda-adjunct";

export const isBlobUrl = (icon: unknown): icon is `blob:${string}` => {
	if (!isString(icon)) {
		return false;
	}
	return icon.startsWith("blob:");
};

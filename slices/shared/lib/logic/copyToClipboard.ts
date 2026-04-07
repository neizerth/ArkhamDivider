import { isString } from "ramda-adjunct";

export const copyToClipboard = (contents: unknown) => {
	const text = isString(contents) ? contents : JSON.stringify(contents);
	navigator.clipboard.writeText(text);
};

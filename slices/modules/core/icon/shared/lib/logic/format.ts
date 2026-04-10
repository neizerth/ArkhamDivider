export const getIconCSSFormat = (code: number) => {
	return `\\${code.toString(16).toUpperCase()}`;
};

export const getIconJavaScriptFormat = (code: number) => {
	if (code <= 0xffff) {
		return `\\u${code.toString(16).padStart(4, "0").toUpperCase()}`;
	}
	return `\\u{${code.toString(16).toUpperCase()}}`;
};

export const getIconCodepointFormat = (code: number) => {
	return `U+${code.toString(16).toUpperCase()}`;
};

export const getIconHTMLFormat = (code: number) => {
	return `&#${code};`;
};

export const getIconChar = (code: number) => {
	return String.fromCodePoint(code);
};

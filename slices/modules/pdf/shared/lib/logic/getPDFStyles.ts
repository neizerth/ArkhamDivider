import type { Style } from "@react-pdf/stylesheet";

export const getPDFStyles = (style?: Style | Style[]) => {
	if (!style) {
		return [];
	}
	if (Array.isArray(style)) {
		return style;
	}
	return [style];
};

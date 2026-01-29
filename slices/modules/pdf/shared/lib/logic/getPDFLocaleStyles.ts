import type { Style } from "@react-pdf/stylesheet";

export const getPDFLocaleStyles = (
	styles: Record<string, Style>,
	language: string,
) => {
	return {
		...styles.default,
		...styles[language],
	};
};

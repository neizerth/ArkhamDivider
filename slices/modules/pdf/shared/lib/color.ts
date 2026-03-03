/** CMYK components 0–100 (PDFKit divides by 100 for PDF). */
export const cmyk = (
	cyan: number,
	magenta: number,
	yellow: number,
	key: number,
) => {
	return [cyan, magenta, yellow, key] as [number, number, number, number];
};

export const rgb = (red: number, green: number, blue: number) => {
	return [red, green, blue] as [number, number, number];
};

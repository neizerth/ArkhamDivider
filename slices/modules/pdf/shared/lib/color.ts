/** CMYK components 0–100 (PDFKit divides by 100 for PDF). */
export const cmyk = (
	cyan: number,
	magenta: number,
	yellow: number,
	key: number,
) => {
	return [cyan, magenta, yellow, key] as [number, number, number, number];
};

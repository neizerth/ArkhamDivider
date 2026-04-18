/**
 * Credits footer layout in mm — print preview (DOM) and PDF must stay aligned.
 */
export const creditsParams = {
	/** Vertical band reserved for the credits block on the page (mm). */
	contentSize: 35,
	/** QR square side in mm. */
	qrDisplaySize: 20,
	/** Row gap in mm. */
	rowGap: 4,
	/** Text font size in mm. */
	textFontSize: 3,
	/** Page inset for the credits block in mm (PDF); also used with `contentSize` for max block height. */
	blockPadding: 5,
	/** Vertical gap between label and URL lines in mm (PDF). */
	textLineGap: 0.5,
} as const;

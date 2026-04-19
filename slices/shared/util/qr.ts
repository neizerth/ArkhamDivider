import QRCode from "qrcode";

export type GetQRDataUrlOptions = {
	url: string;
	/** CSS pixel size of the rendered square (width and height). */
	displaySize: number;
};

export async function getQRDataUrl(
	options: GetQRDataUrlOptions,
): Promise<string> {
	const { url, displaySize } = options;
	return QRCode.toDataURL(url, {
		margin: 0,
		width: Math.max(128, Math.round(displaySize * 2)),
		errorCorrectionLevel: "M",
	});
}

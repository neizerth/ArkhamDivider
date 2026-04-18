import { Buffer } from "buffer";
import QRCode from "qrcode";

type GetQRSizeOptions = {
	minWidth?: number;
	size: number;
	rasterOverSampleRatio?: number;
};

export function getQRSize({
	size,
	rasterOverSampleRatio = 2,
	minWidth = 64,
}: GetQRSizeOptions): number {
	return Math.max(minWidth, Math.round(size * rasterOverSampleRatio));
}

type GetQRDataUrlOptions = GetQRSizeOptions & {
	url: string;
	symbolMargin?: number;
};

export const getQRDataUrl = async (options: GetQRDataUrlOptions) => {
	const { url, symbolMargin = 1 } = options;

	return QRCode.toDataURL(url, {
		margin: symbolMargin,
		width: getQRSize(options),
	});
};

export const getQRPngBuffer = async (options: GetQRDataUrlOptions) => {
	const dataUrl = await getQRDataUrl(options);
	const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
	return Buffer.from(base64, "base64");
};

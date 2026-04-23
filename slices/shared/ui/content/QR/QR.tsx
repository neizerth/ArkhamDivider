import Box, { type BoxProps } from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getQRDataUrl } from "@/shared/util/qr";

type QRProps = Omit<BoxProps, "children"> & {
	url: string;
	/** Display size in mm (width and height). */
	size: number;
	mmSize: number;
	sx?: SxProps;
};

/** `qrcode` + `toDataURL` — options aligned with PDF via `@/shared/lib/creditsQrRaster`. */
export function QR({ url, size, mmSize, sx, ...boxProps }: QRProps) {
	const [dataUrl, setDataUrl] = useState<string | null>(null);
	const sizePx = size * mmSize;
	// Match PDF generation raster density:
	// PDF path passes `qrDisplaySize` converted to points; if we pass raw mm here,
	// Chrome print ends up with a much smaller QR bitmap (e.g. 64px) than PDF (e.g. 113px).
	// This only affects the internal raster resolution, not the displayed size (still `size` mm).
	const mmToPt = 72 / 25.4;
	const rasterSize = size * mmToPt;

	useEffect(() => {
		let cancelled = false;
		void getQRDataUrl({ url, size: rasterSize }).then((data) => {
			if (!cancelled) {
				setDataUrl(data);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [url, rasterSize]);

	const placeholderSx = [
		{
			width: `${sizePx}px`,
			height: `${sizePx}px`,
			flexShrink: 0,
			"@media print": {
				width: `${size}mm`,
				height: `${size}mm`,
			},
		} satisfies SxProps<Theme>,
		...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
	] as SxProps<Theme>;

	const imageSx = [
		{
			width: `${sizePx}px`,
			height: `${sizePx}px`,
			display: "block",
			flexShrink: 0,
			"@media print": {
				width: `${size}mm`,
				height: `${size}mm`,
			},
		} satisfies SxProps<Theme>,
		...(Array.isArray(sx) ? sx : sx != null ? [sx] : []),
	] as SxProps<Theme>;

	if (!dataUrl) {
		return <Box {...boxProps} sx={placeholderSx} />;
	}

	return (
		<Box {...boxProps} alt="" component="img" src={dataUrl} sx={imageSx} />
	);
}

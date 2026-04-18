import Box, { type BoxProps } from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getQRDataUrl } from "@/shared/util/qr";

type QRProps = Omit<BoxProps, "children"> & {
	url: string;
	/** Display size in px (width and height). */
	size: number;
	sx?: SxProps;
};

/** `qrcode` + `toDataURL` — options aligned with PDF via `@/shared/lib/creditsQrRaster`. */
export function QR({ url, size, sx, ...boxProps }: QRProps) {
	const [dataUrl, setDataUrl] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		void getQRDataUrl({ url, size }).then((data) => {
			if (!cancelled) {
				setDataUrl(data);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [url, size]);

	if (!dataUrl) {
		return (
			<Box
				{...boxProps}
				sx={{
					width: size,
					height: size,
					flexShrink: 0,
					...sx,
				}}
			/>
		);
	}

	return (
		<Box
			{...boxProps}
			alt=""
			component="img"
			src={dataUrl}
			sx={{
				width: size,
				height: size,
				display: "block",
				flexShrink: 0,
				...sx,
			}}
		/>
	);
}

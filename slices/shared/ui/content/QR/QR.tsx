import Box, { type BoxProps } from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getQRDataUrl } from "@/shared/util";

type QRProps = Omit<BoxProps, "children"> & {
	url: string;
	/** Display size in px (width and height). */
	size: number;
	sx?: SxProps;
};

export function QR({ url, size, sx, ...boxProps }: QRProps) {
	const [src, setSrc] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		void getQRDataUrl({ url, displaySize: size }).then((data) => {
			if (!cancelled) {
				setSrc(data);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [url, size]);

	return (
		<Box
			component="img"
			alt=""
			src={src ?? undefined}
			width={size}
			height={size}
			sx={{ display: "block", ...sx }}
			{...boxProps}
		/>
	);
}

import type { BoxProps } from "@mui/material/Box";
import type { Side } from "@/shared/model";
import * as C from "./Page.components";

type PageProps = Omit<BoxProps, "width" | "height"> & {
	side: Side;
	width: number;
	height: number;
	number: number;
	total: number;
	rotatedCounter?: boolean;
	showSide?: boolean;
};

const sideLetter = {
	front: "A",
	back: "B",
};

export function Page({
	children,
	rotatedCounter,
	showSide,
	side,
	total,
	number,
	width,
	height,
	sx: sxProps = {},
	...props
}: PageProps) {
	const aspectRatio = width / height;

	const sx = {
		...sxProps,
		aspectRatio,
		"@media print": {
			width: `${width}mm`,
			height: `${height}mm`,
			maxHeight: `${height}mm`,
		},
	};
	return (
		<C.Page {...props} side={side} sx={sx}>
			<C.Counter rotated={rotatedCounter}>
				{number}
				{showSide && `${sideLetter[side]} / ${total}`}
			</C.Counter>
			{children}
		</C.Page>
	);
}

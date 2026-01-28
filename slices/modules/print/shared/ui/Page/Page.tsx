import type { BoxProps } from "@mui/material/Box";
import type { Side } from "@/shared/model";
import * as C from "./Page.components";
import { pageSideStyles } from "./Page.styles";

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
		backgroundColor: "#fff",
		"@media print": {
			width: `${width}mm`,
			height: `${height}mm`,
			maxHeight: `${height}mm`,
		},
		"@media screen": {
			width: "100%",
			...pageSideStyles[side],
		},
	};
	return (
		<C.Page {...props} sx={sx}>
			<C.Counter rotated={rotatedCounter}>
				{number}
				{showSide && `${sideLetter[side]} / ${total}`}
			</C.Counter>
			{children}
		</C.Page>
	);
}

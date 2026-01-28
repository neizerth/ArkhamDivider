import type { BoxProps } from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import type { Side } from "@/shared/model";
import { PAGE_TOP_PADDING } from "../../config";
import { fromPx } from "../../lib";
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
	mmSize: number;
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
	mmSize,
	...props
}: PageProps) {
	const { justifyContent } = props;

	const mm = fromPx(mmSize);

	const aspectRatio = width / height;

	const sx = {
		...sxProps,
		aspectRatio,
		backgroundColor: "#fff",
		...(justifyContent === "flex-start" && {
			paddingTop: mm(PAGE_TOP_PADDING),
		}),
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

	const counterSx: SxProps = {
		"@media screen": {
			fontSize: mm(2.2),
			top: mm(1.5),
			right: mm(1.3),
			...(rotatedCounter && {
				top: mm(-1.6),
				right: mm(0.2),
			}),
		},
	};

	return (
		<C.Page {...props} sx={sx}>
			<C.Counter rotated={rotatedCounter} sx={counterSx}>
				{number}
				{showSide && sideLetter[side]} / {total}
			</C.Counter>
			{children}
		</C.Page>
	);
}

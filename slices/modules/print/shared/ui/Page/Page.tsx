import type { BoxProps } from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import type { Side } from "@/shared/model";
import { PAGE_TOP_PADDING } from "../../config";
import { fromPx, getPageCounterText } from "../../lib";
import * as C from "./Page.components";
import { pageSideStyles } from "./Page.styles";

type PageProps = Omit<BoxProps, "width" | "height"> & {
	side: Side;
	width: number;
	height: number;
	number: number;
	total: number;
	showSide?: boolean;
	mmSize: number;
};

export function Page({
	children,
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
		},
	};

	const counterText = getPageCounterText({ number, total, showSide, side });

	return (
		<C.Page {...props} sx={sx}>
			<C.Counter sx={counterSx}>{counterText}</C.Counter>
			{children}
		</C.Page>
	);
}

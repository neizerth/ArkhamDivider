import type { BoxProps } from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import type { Side } from "@/shared/model";
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
	hideCounter?: boolean;
	mmSize: number;
};

export function Page({
	children,
	showSide,
	hideCounter,
	side,
	total,
	number,
	width,
	height,
	sx: sxProps = {},
	mmSize,
	...props
}: PageProps) {
	const mm = fromPx(mmSize);

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
			/**
			 * Skip layout and paint for pages outside the viewport. Unlike virtualizing the
			 * list, the nodes stay in the DOM, so `window.print` still paginates the whole run
			 * and `getDividerNodeById` still finds every divider during export.
			 *
			 * Scoped to `@media screen` on purpose: printing must lay out every page.
			 *
			 * `auto` in `contain-intrinsic-size` makes the browser remember each page's real
			 * size after it has been rendered once, so the scrollbar settles instead of
			 * jumping; the mm values are only the first-pass estimate.
			 */
			contentVisibility: "auto",
			containIntrinsicSize: `auto ${width}mm auto ${height}mm`,
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
			{!hideCounter && <C.Counter sx={counterSx}>{counterText}</C.Counter>}
			{children}
		</C.Page>
	);
}

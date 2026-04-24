import { Box, type BoxProps } from "@mui/material";
import { useMemo } from "react";
import { getArkhamIndexDividerBackgroundPath } from "../../lib";
import { useArkhamIndexContext } from "../ArkhamIndexContext";

type ArkhamIndexDividerBorderProps = BoxProps;

export function ArkhamIndexDividerBorder(props: ArkhamIndexDividerBorderProps) {
	const { layout, tabSize, tabIndex, sxOptions } = useArkhamIndexContext();
	const { tab, cornerRadius } = sxOptions.objects;

	const { width, height } = layout.size;

	const strokeWidth = 2;

	const path = useMemo(
		() =>
			getArkhamIndexDividerBackgroundPath({
				width,
				height,
				cornerRadius,
				tabHeight: tab.height,
				tabSideWidth: tab.sideWidth,
				tabWidths: tab.width,
				tabSize,
				tabIndex,
			}),
		[
			cornerRadius,
			height,
			tab.height,
			tab.sideWidth,
			tab.width,
			tabIndex,
			tabSize,
			width,
		],
	);

	return (
		<Box
			aria-hidden
			component="svg"
			preserveAspectRatio="none"
			sx={{
				display: "block",
				overflow: "visible",
				pointerEvents: "none",
				width: "100%",
				...props.sx,
			}}
			viewBox={`0 0 ${width} ${height}`}
		>
			<path
				d={path}
				fill="none"
				stroke="red"
				strokeLinejoin="round"
				strokeWidth={strokeWidth}
				vectorEffect="non-scaling-stroke"
			/>
		</Box>
	);
}

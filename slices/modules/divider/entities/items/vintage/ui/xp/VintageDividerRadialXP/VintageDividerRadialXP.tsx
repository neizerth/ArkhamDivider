import { Box, type BoxProps } from "@mui/material";
import { useId } from "react";
import { xpRangeStatuses } from "@/modules/divider/shared/config";
import { getXPRangeStatus } from "@/modules/divider/shared/lib";
import type { XPCost } from "@/modules/divider/shared/model";
import { vintageRadialXPColors as colors } from "../../../config/colors";

type VintageDividerRadialXPProps = BoxProps & {
	xpCost: XPCost;
};

const dotRadius = 0.9;
const dotCenters = [
	{ x: 1.5, y: 1.2 },
	{ x: 4.6, y: 3.2 },
	{ x: 8.1, y: 3.9 },
	{ x: 11.8, y: 3.3 },
	{ x: 15.0, y: 1.2 },
];

const viewBox = { w: 16, h: 5 };
const aspectRatio = viewBox.w / viewBox.h;

export function VintageDividerRadialXP({
	xpCost,
	...props
}: VintageDividerRadialXPProps) {
	const baseId = useId().replace(/:/g, "");

	return (
		<Box
			{...props}
			sx={{
				display: "inline-flex",
				verticalAlign: "middle",
				...props.sx,
				height: "1em",
				width: `${aspectRatio}em`,
			}}
		>
			<svg
				viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
				width="100%"
				height="100%"
				style={{ overflow: "visible", display: "block" }}
				aria-hidden
			>
				<title>XP level</title>
				<defs>
					{xpRangeStatuses.map((status) => (
						<radialGradient
							key={status}
							id={`${baseId}-${status}`}
							cx="50%"
							cy="50%"
							r="50%"
						>
							<stop offset="0%" stopColor={colors[status]} />
							<stop offset="80%" stopColor={colors[status]} />
							<stop offset="100%" stopColor={colors[status]} stopOpacity={0} />
						</radialGradient>
					))}
				</defs>
				{dotCenters.map((p, i) => (
					<circle
						key={`${p.x}-${p.y}`}
						cx={p.x}
						cy={p.y}
						r={dotRadius}
						fill={`url(#${baseId}-${getXPRangeStatus(i, xpCost)})`}
					/>
				))}
			</svg>
		</Box>
	);
}

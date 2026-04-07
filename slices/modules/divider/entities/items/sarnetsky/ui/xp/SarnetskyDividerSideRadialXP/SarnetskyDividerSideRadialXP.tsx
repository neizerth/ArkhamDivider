import { Box, type BoxProps } from "@mui/material";
import { useId } from "react";
import { xpRangeStatuses } from "@/modules/divider/shared/config";
import { getXPRangeStatus } from "@/modules/divider/shared/lib";
import type { XPCost } from "@/modules/divider/shared/model";
import { sarnetskyXPColors } from "../../../config/colors";

type SarnetskyDividerSideRadialXPProps = BoxProps & {
	xpCost: XPCost;
};

const dotRadius = 0.9;
const dotCenters = [
	{ x: 1.2, y: 14.5 },
	{ x: 3.2, y: 11.4 },
	{ x: 3.9, y: 7.9 },
	{ x: 3.3, y: 4.2 },
	{ x: 1.2, y: 1.0 },
];

const viewBox = { w: 5, h: 16 };
const aspectRatio = viewBox.w / viewBox.h;

export function SarnetskyDividerSideRadialXP({
	xpCost,
	...props
}: SarnetskyDividerSideRadialXPProps) {
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
							<stop offset="0%" stopColor={sarnetskyXPColors[status]} />
							<stop offset="80%" stopColor={sarnetskyXPColors[status]} />
							<stop
								offset="100%"
								stopColor={sarnetskyXPColors[status]}
								stopOpacity={0}
							/>
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

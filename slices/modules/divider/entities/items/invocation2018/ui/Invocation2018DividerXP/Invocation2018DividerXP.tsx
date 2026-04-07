import { Box, type BoxProps } from "@mui/material";
import { range } from "ramda";
import { useId } from "react";
import { xpRangeStatuses } from "@/modules/divider/shared/config";
import { getXPRangeStatus } from "@/modules/divider/shared/lib";
import type { XPCost } from "@/modules/divider/shared/model";

type Invocation2018DividerXPProps = BoxProps & {
	xpCost: XPCost;
};

const gradientColors = {
	inactive: "#544331",
	active: "#fff",
	range: "#b3baaa",
};

// Size and spacing scale with viewBox (parent controls via font-size)
const circleRadius = 1.4;
const gapX = 3.7; // horizontal distance between circle centers (~1.5–2 diameters)
const gapY = 1.4; // vertical step between arc levels (outer higher, center lower)
// viewBox width: from first circle left edge to fifth circle right edge
const totalWidth = 2 * circleRadius + gapX + 4 * (circleRadius * 2 + gapX);
const totalHeight = circleRadius * 2 + gapY * 4;
const centerY = totalHeight / 2;
const circleCentersX = range(0, 5).map(
	(i) => circleRadius + gapX + i * (circleRadius * 2 + gapX),
);

// Arc: pairs at same height, center circle lowest
const circleCentersY = [
	centerY - gapY * 4.5, // 0 — top
	centerY - gapY, // 1
	centerY + gapY, // 2 — bottom of arc
	centerY - gapY, // 3
	centerY - gapY * 4.5, // 4 — top
];

const aspectRatio = totalWidth / totalHeight;

export function Invocation2018DividerXP({
	xpCost,
	...props
}: Invocation2018DividerXPProps) {
	const baseId = useId().replace(/:/g, "");

	return (
		<Box
			{...props}
			sx={{
				display: "inline-flex",
				verticalAlign: "middle",
				...props.sx,
				// Size from parent font-size only (overrides width/height from sx)
				height: "1em",
				width: `${aspectRatio}em`,
			}}
		>
			<svg
				viewBox={`0 0 ${totalWidth} ${totalHeight}`}
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
							<stop offset="0%" stopColor={gradientColors[status]} />
							<stop offset="85%" stopColor={gradientColors[status]} />
							<stop
								offset="100%"
								stopColor={gradientColors[status]}
								stopOpacity={0}
							/>
						</radialGradient>
					))}
				</defs>
				{circleCentersX.map((x, i) => (
					<circle
						key={x}
						cx={x}
						cy={circleCentersY[i]}
						r={circleRadius}
						fill={`url(#${baseId}-${getXPRangeStatus(i, xpCost)})`}
					/>
				))}
			</svg>
		</Box>
	);
}

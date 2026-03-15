import { Box, type BoxProps } from "@mui/material";
import { useId } from "react";
import { getXPLevel } from "@/modules/divider/shared/lib";
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
const circleCentersX = [0, 1, 2, 3, 4].map(
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

type ColorType = "active" | "range" | "inactive";

const colorTypes: ColorType[] = ["active", "range", "inactive"];

function getCircleFill(i: number, xpCost: XPCost): ColorType {
	const defaultLevel = getXPLevel(xpCost) ?? 0;
	const level = defaultLevel - 1;
	if (i < level) {
		return "inactive";
	}
	if (i === level) {
		return "active";
	}
	if (xpCost.type === "range" && i < xpCost.max) {
		return "range";
	}
	return "inactive";
}

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
					{colorTypes.map((kind) => (
						<radialGradient
							key={kind}
							id={`${baseId}-${kind}`}
							cx="50%"
							cy="50%"
							r="50%"
						>
							<stop offset="0%" stopColor={gradientColors[kind]} />
							<stop offset="85%" stopColor={gradientColors[kind]} />
							<stop
								offset="100%"
								stopColor={gradientColors[kind]}
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
						fill={`url(#${baseId}-${getCircleFill(i, xpCost)})`}
					/>
				))}
			</svg>
		</Box>
	);
}

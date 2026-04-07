import { Box, type BoxProps } from "@mui/material";
import { range } from "ramda";
import type { XPCost } from "@/modules/divider/shared/model";

type ArkhamDecoDividerSideXPProps = BoxProps & {
	xpCost: XPCost;
};

const MAX_XP = 5;

// Geometry mirrors the legacy SCSS offsets:
// - inactive level slot is 2mm wide
// - filled/range level slot is 2.4mm wide
// - full bar is 4mm, shifted left by 1.3mm and down by 0.8mm
// - small bar is 2mm, bottom-aligned inside the slot
const SLOT_WIDTH = 2;
const SLOT_WIDTH_FULL = 2.4;
const FULL_WIDTH = 4;
const SMALL_WIDTH = 2.4;
const SMALL_OFFSET_X = 1.2;
const FULL_OFFSET_X = -1.3;
const FULL_OFFSET_Y = -0.8;
const SLOT_HEIGHT = 2;

const FULL_VIEWBOX = { w: 38, h: 22 };
const SMALL_VIEWBOX = { w: 27, h: 11 };

const bars = range(1, MAX_XP + 1);

const getXPBounds = (xpCost: XPCost) => {
	const level = xpCost.type === "fixed" ? xpCost.value : xpCost.min;
	const max = xpCost.type === "range" ? xpCost.max : level;

	return {
		level: Math.min(Math.max(level, 0), MAX_XP),
		max: Math.min(Math.max(max, 0), MAX_XP),
	};
};

export function ArkhamDecoDividerSideXP({
	xpCost,
	...props
}: ArkhamDecoDividerSideXPProps) {
	const { level, max } = getXPBounds(xpCost);
	const scaleFull = FULL_WIDTH / FULL_VIEWBOX.w;
	const scaleSmall = SMALL_WIDTH / SMALL_VIEWBOX.w;

	// Source-path bottoms: full ends at y=21, small ends at y=10 (see svg paths).
	// We align small bottoms to full bottoms after scaling.
	const smallBaselineShift = 21 * scaleFull - 10 * scaleSmall;

	const slotWidths = bars.map((value) =>
		value <= max ? SLOT_WIDTH_FULL : SLOT_WIDTH,
	);
	const slotXByValue = slotWidths.reduce<number[]>((acc, _w, idx) => {
		const prev = acc[idx - 1] ?? 0;
		acc.push(idx === 0 ? 0 : prev + slotWidths[idx - 1]);
		return acc;
	}, []);
	const totalSlotsWidth =
		slotWidths.reduce((sum, w) => sum + w, 0) || MAX_XP * SLOT_WIDTH;

	const viewBox = {
		x: FULL_OFFSET_X,
		y: FULL_OFFSET_Y,
		w: totalSlotsWidth + (FULL_WIDTH - SLOT_WIDTH) + Math.abs(FULL_OFFSET_X),
		h: SLOT_HEIGHT + Math.abs(FULL_OFFSET_Y) + smallBaselineShift,
	};

	const aspectRatio = viewBox.w / viewBox.h;

	return (
		<Box
			{...props}
			sx={{
				display: "inline-flex",
				verticalAlign: "middle",
				height: "1em",
				width: `${aspectRatio}em`,
				...props.sx,
			}}
		>
			<svg
				viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
				width="100%"
				height="100%"
				style={{ overflow: "visible", display: "block" }}
				aria-hidden
			>
				<title>XP level</title>
				{bars.map((value) => {
					const slotX = slotXByValue[value - 1] ?? (value - 1) * SLOT_WIDTH;
					const isInactive = value > max;
					const isActive = value <= level;

					if (isInactive) {
						return (
							<g
								key={value}
								transform={`translate(${slotX + FULL_OFFSET_X + SMALL_OFFSET_X}, ${
									FULL_OFFSET_Y + smallBaselineShift
								}) scale(${scaleSmall})`}
							>
								<path
									d="M12.3931 10L2.98757 1H14.9902L24.4905 10H12.3931Z"
									fill="none"
									stroke="black"
									strokeWidth={2}
								/>
							</g>
						);
					}

					return (
						<g
							key={value}
							transform={`translate(${slotX + FULL_OFFSET_X}, ${FULL_OFFSET_Y}) scale(${scaleFull})`}
						>
							<path
								d="M23.393 21L2.49151 1H14.3793L35.4904 21H23.393Z"
								fill={isActive ? "black" : "none"}
								stroke="black"
								strokeWidth={2}
							/>
						</g>
					);
				})}
			</svg>
		</Box>
	);
}

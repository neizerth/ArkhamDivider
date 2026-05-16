export const FRAME_VIEWBOX_CENTER = 50;
const FRAME_CIRCLE_RADIUS = FRAME_VIEWBOX_CENTER;

export const getFrameStrokeRotationTransform = (
	rotationDeg: number,
	center = FRAME_VIEWBOX_CENTER,
) => `rotate(${rotationDeg}, ${center}, ${center})`;

/** Counter-rotate so gold gradient stays vertical on screen. */
export const getFrameGradientTransform = (
	rotationDeg: number,
	center = FRAME_VIEWBOX_CENTER,
) => `rotate(${-rotationDeg}, ${center}, ${center})`;

const degToArcLength = (deg: number, radius: number) =>
	(deg / 360) * (2 * Math.PI * radius);

/**
 * Dashes on a circle: dashOffset/2 gap, dash, dashOffset gap, dash, …, dashOffset/2 gap.
 * dashWidth is derived so segments and gaps fill 360°.
 *
 * SVG circle path starts at 3 o'clock; `startAngleDeg` shifts the pattern (0° = top / 12 o'clock).
 */
export function getCircleFrameDash({
	segmentCount,
	dashOffsetDeg,
	startAngleDeg = 90,
	radius = FRAME_CIRCLE_RADIUS,
}: {
	segmentCount: number;
	dashOffsetDeg: number;
	/** Where user 0° sits on the circle, clockwise from SVG path origin. */
	startAngleDeg?: number;
	radius?: number;
}) {
	const dashWidthDeg = (360 - segmentCount * dashOffsetDeg) / segmentCount;
	const dash = degToArcLength(dashWidthDeg, radius);
	const gap = degToArcLength(dashOffsetDeg, radius);

	return {
		strokeDasharray: `${dash} ${gap}`,
		strokeDashoffset: degToArcLength(startAngleDeg, radius) + gap / 2,
	};
}

import { Box, type BoxProps, type SxProps, type Theme } from "@mui/material";
import { useId } from "react";
import { usePrintSx } from "@/modules/print/shared/lib";
import {
	FRAME_VIEWBOX_CENTER,
	getCircleFrameDash,
	getFrameGradientTransform,
	getFrameStrokeRotationTransform,
} from "./circleFrameTransform";
import * as S from "./InvestigatorTokenCircleFrame.styles";

const SEGMENT_COUNT = 8;
/** Gap between dashed frame segments, in degrees. */
const DASH_OFFSET_DEG = 16;
/** Rotates dashed stroke; gradient is counter-rotated to stay screen-vertical. */
const STROKE_ROTATION_DEG = 16.1;

export function InvestigatorTokenCircleFrame(props: BoxProps<"svg">) {
	const id = useId();
	const getPrintSx = usePrintSx();
	const circleFrameSx = getPrintSx(S.circleFrameSx);

	const center = FRAME_VIEWBOX_CENTER;

	const { strokeDasharray, strokeDashoffset } = getCircleFrameDash({
		segmentCount: SEGMENT_COUNT,
		dashOffsetDeg: DASH_OFFSET_DEG,
	});

	const strokeRotation = getFrameStrokeRotationTransform(
		STROKE_ROTATION_DEG,
		center,
	);
	const gradientTransform = getFrameGradientTransform(
		STROKE_ROTATION_DEG,
		center,
	);

	const sx = {
		...circleFrameSx,
		...props.sx,
	} as SxProps<Theme>;

	return (
		<Box
			{...props}
			aria-hidden
			component="svg"
			sx={sx}
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			fill="none"
		>
			<title>Investigator token frame</title>
			<defs>
				<linearGradient
					id={`${id}-frame-gradient`}
					gradientUnits="userSpaceOnUse"
					x1={center}
					y1="0"
					x2={center}
					y2="100"
					gradientTransform={gradientTransform}
				>
					<stop offset="0%" stopColor="#FFF6D8" />
					<stop offset="12%" stopColor="#F0D878" />
					<stop offset="32%" stopColor="#C9A227" />
					<stop offset="50%" stopColor="#7A5A18" />
					<stop offset="68%" stopColor="#C9A227" />
					<stop offset="88%" stopColor="#F0D878" />
					<stop offset="100%" stopColor="#FFF6D8" />
				</linearGradient>
			</defs>
			<g transform={strokeRotation}>
				<circle
					cx={center}
					cy={center}
					r={center}
					fill="none"
					strokeWidth="1"
					strokeLinecap="butt"
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
					stroke={`url(#${id}-frame-gradient)`}
				/>
			</g>
		</Box>
	);
}

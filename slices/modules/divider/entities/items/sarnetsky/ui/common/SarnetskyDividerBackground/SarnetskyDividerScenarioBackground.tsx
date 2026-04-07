import { SarnetskyFrame } from "@assets/images/background/sarnetsky";
import { Box, type BoxProps, type SxProps } from "@mui/material";
import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import type { DividerType } from "@/modules/divider/shared/model";
import type { StoryWithRelations } from "@/modules/story/shared/model";
import { absoluteFill } from "@/shared/config";
import { useAppSelector } from "@/shared/lib";
import {
	getSarnetskyDefaultOverlayColor as getDefaultOverlayColor,
	getSarnetskyStoryColor as getStoryColor,
} from "../../../lib";
import { useSarnetskyDividerContext } from "../../SarnetskyDividerContext";

type SarnetskyDividerScenarioBackgroundProps = BoxProps & {
	type: DividerType;
	story?: StoryWithRelations;
};
export function SarnetskyDividerScenarioBackground({
	type,
	story,
	...props
}: SarnetskyDividerScenarioBackgroundProps) {
	const { divider } = useSarnetskyDividerContext();

	const layout = useAppSelector(selectLayout);

	const id = useMemo(() => {
		switch (type) {
			case "scenario":
			case "campaign":
				return "scenario";
			case "encounter":
				return "encounter";
			default:
				return null;
		}
	}, [type]);

	if (!id || !layout) {
		return null;
	}

	const { orientation } = layout;
	const { icon, params } = divider;

	const defaultOverlayColor = getDefaultOverlayColor(icon);
	const overlayColor = params?.overlayColor ?? defaultOverlayColor;

	const defaultFrameColor = getStoryColor(story);
	const frameColor = params?.frameColor ?? defaultFrameColor;

	const prefix = `/images/divider/background/sarnetsky/${orientation}/${id}`;

	const backgroundSrc = `${prefix}/background.jpg`;
	const frameSrc = `${prefix}/frame.png`;

	const Color = SarnetskyFrame[orientation][id];

	const sx = {
		position: "absolute",
		width: "100%",
		height: "100%",
		...props.sx,
	} as SxProps;

	return (
		<Box sx={sx}>
			<Box
				component="img"
				src={backgroundSrc}
				sx={{ ...absoluteFill, zIndex: 1, objectFit: "cover" }}
			/>

			<Color
				fill={frameColor}
				style={{
					...absoluteFill,
					zIndex: 2,
					mixBlendMode: "multiply",
					transform: "translate3d(0, 0, 0)",
					transition: "fill 0.3s ease-in-out",
				}}
			/>
			<Box component="img" src={frameSrc} sx={{ ...absoluteFill, zIndex: 3 }} />

			{overlayColor && (
				<Box
					bgcolor={overlayColor}
					sx={{
						...absoluteFill,
						zIndex: 4,
						mixBlendMode: "color",
						opacity: 0.4,
						transition: "opacity 0.3s ease-in-out",
					}}
				/>
			)}
		</Box>
	);
}

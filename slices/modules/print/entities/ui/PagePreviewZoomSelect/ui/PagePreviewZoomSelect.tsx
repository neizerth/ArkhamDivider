import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useCallback } from "react";
import { selectPreviewZoom, setPreviewZoom } from "@/modules/print/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

type PagePreviewZoomSelectProps = BoxProps;

export const zoomLevels = [50, 75, 100, 200, 300];

export function PagePreviewZoomSelect(props: PagePreviewZoomSelectProps) {
	const dispatch = useAppDispatch();
	const zoom = useAppSelector(selectPreviewZoom);

	const setZoom = useCallback(
		(_event: React.MouseEvent<HTMLElement>, value: number) => {
			dispatch(setPreviewZoom(value));
		},
		[dispatch],
	);

	return (
		<Box {...props}>
			<ToggleButtonGroup size="small" value={zoom} onChange={setZoom} exclusive>
				{zoomLevels.map((level) => (
					<ToggleButton
						key={level}
						value={level}
						sx={{
							display: {
								xs: level < 100 ? "none" : "block",
								sm: "block",
							},
						}}
					>
						{`${level}%`}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	);
}

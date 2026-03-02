import { useMediaQuery, useTheme } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useCallback, useMemo } from "react";
import { selectPreviewZoom, setPreviewZoom } from "@/modules/print/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

type PagePreviewZoomSelectProps = BoxProps;

export const zoomLevels = [50, 75, 100, 200, 300];

export function PagePreviewZoomSelect(props: PagePreviewZoomSelectProps) {
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const zoom = useAppSelector(selectPreviewZoom);

	const setZoom = useCallback(
		(_event: React.MouseEvent<HTMLElement>, value: number) => {
			dispatch(setPreviewZoom(value));
		},
		[dispatch],
	);

	const isXS = useMediaQuery(theme.breakpoints.only("xs"));

	const levels = useMemo(() => {
		if (isXS) {
			return zoomLevels.filter((level) => level >= 100);
		}
		return zoomLevels;
	}, [isXS]);

	return (
		<Box {...props}>
			<ToggleButtonGroup size="small" value={zoom} onChange={setZoom} exclusive>
				{levels.map((level) => (
					<ToggleButton key={level} value={level}>
						{`${level}%`}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	);
}

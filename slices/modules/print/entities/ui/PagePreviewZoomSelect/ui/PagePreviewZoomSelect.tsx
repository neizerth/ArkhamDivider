import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { selectPreviewZoom, setPreviewZoom } from "@/modules/print/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

type PagePreviewZoomSelectProps = BoxProps;

export const zoomLevels = [0, 50, 75, 100, 200, 300];
const defaultZoom = 0;

export function PagePreviewZoomSelect(props: PagePreviewZoomSelectProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const zoom = useAppSelector(selectPreviewZoom) ?? defaultZoom;

	const setZoom = useCallback(
		(_event: React.MouseEvent<HTMLElement>, value: number) => {
			dispatch(setPreviewZoom(value || null));
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
								xs: level > 0 && level < 100 ? "none" : "block",
								sm: "block",
							},
						}}
					>
						{level ? `${level}%` : t("zoom.level.page")}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	);
}

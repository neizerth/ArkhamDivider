import { Box, type BoxProps, type SxProps } from "@mui/material";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerBleedViewProps = BoxProps;

export function DividerBleedView(props: DividerBleedViewProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	if (!layoutSize) {
		return null;
	}
	const { originalBleed, bleedEnabled } = layoutSize;
	const offset = bleedEnabled ? 0 : originalBleed;

	const sx = {
		zIndex: 1,
		position: "absolute",
		top: -offset,
		left: -offset,
		right: -offset,
		bottom: -offset,
		...props.sx,
	} as SxProps;
	return <Box {...props} sx={sx} />;
}

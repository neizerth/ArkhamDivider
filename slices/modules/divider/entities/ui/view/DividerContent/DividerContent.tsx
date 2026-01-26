import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerContentProps = BoxProps;

export function DividerContent(props: DividerContentProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	if (!layoutSize) {
		return null;
	}
	const { originalBleed } = layoutSize;
	const offset = originalBleed;
	const sxProps = {
		...props.sx,
		position: "absolute",
		zIndex: 2,
		top: offset,
		left: offset,
		right: offset,
		bottom: offset,
	} as SxProps;

	return <Box {...props} sx={sxProps} />;
}

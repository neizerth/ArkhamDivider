import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerBackgroundProps = Omit<BoxProps<"img">, "component">;

export function DividerBackground(props: DividerBackgroundProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	if (!layoutSize) {
		return null;
	}
	const { originalBleed } = layoutSize;

	const sx = {
		zIndex: 1,
		position: "absolute",
		top: -originalBleed,
		left: -originalBleed,
		right: -originalBleed,
		bottom: -originalBleed,
		...props.sx,
	} as SxProps;
	return <Box {...props} component="img" sx={sx} />;
}

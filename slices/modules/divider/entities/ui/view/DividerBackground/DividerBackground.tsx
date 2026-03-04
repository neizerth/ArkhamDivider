import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerBackgroundProps = Omit<BoxProps<"img">, "component">;

export function DividerBackground({ src, ...props }: DividerBackgroundProps) {
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
	return (
		<Box {...props} sx={sx}>
			<Box
				component="img"
				src={src}
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: "100%",
					height: "100%",
				}}
			/>
		</Box>
	);
}

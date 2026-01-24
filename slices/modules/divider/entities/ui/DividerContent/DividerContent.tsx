import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerContentProps = BoxProps;

export function DividerContent(props: DividerContentProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	if (!layoutSize) {
		return null;
	}
	const { originalBleed, bleedEnabled } = layoutSize;
	const offset = bleedEnabled ? 0 : originalBleed;
	const sxProps = props.sx ?? {};

	return (
		<Box
			sx={{
				position: "relative",
				zIndex: 2,
				top: offset,
				left: offset,
				...sxProps,
			}}
			{...props}
		/>
	);
}

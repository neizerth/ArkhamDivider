import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import {
	useCornerRadius,
	usePrintPxCallback,
} from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import type { Side } from "@/shared/model";

type DividerContentProps = BoxProps & {
	hideBorderRadius?: boolean;
	side: Side;
};

export function DividerContent({
	hideBorderRadius = false,
	side,
	...props
}: DividerContentProps) {
	const layoutSize = useAppSelector(selectPrintableLayoutSize);
	const borderRadius = useCornerRadius();
	const mm = usePrintPxCallback();
	if (!layoutSize) {
		return null;
	}
	const { originalBleed, bleedEnabled } = layoutSize;
	const offset = bleedEnabled ? originalBleed : 0;
	const outlineWidth = 0.25;
	const isFront = side === "front";

	const enabled = borderRadius && !hideBorderRadius && isFront;
	const sxProps = {
		...(enabled
			? {
					outline: `${mm(outlineWidth)} dashed red`,
					borderRadius: mm(borderRadius),
				}
			: {}),
		position: "absolute",
		printColorAdjust: "exact",
		zIndex: 2,
		top: offset,
		left: offset,
		right: offset,
		bottom: offset,
		...props.sx,
	} as SxProps;

	return <Box {...props} sx={sxProps} />;
}

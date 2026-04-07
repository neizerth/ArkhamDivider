import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import {
	useCornerRadius,
	usePrintPxCallback,
} from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";

type DividerContentProps = BoxProps & {
	hideBorderRadius?: boolean;
};

export function DividerContent({
	hideBorderRadius = false,
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
	const sxProps = {
		...(borderRadius && !hideBorderRadius
			? {
					outline: `${mm(outlineWidth)} dashed red`,
					borderRadius: mm(borderRadius),
				}
			: {}),
		position: "absolute",
		zIndex: 2,
		top: offset,
		left: offset,
		right: offset,
		bottom: offset,
		...props.sx,
	} as SxProps;

	return <Box {...props} sx={sxProps} />;
}

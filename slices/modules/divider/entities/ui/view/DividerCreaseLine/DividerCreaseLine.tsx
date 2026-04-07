import { Box, type BoxProps } from "@mui/material";
import { CREASE_LINE_WIDTH } from "@/modules/print/shared/config";
import {
	selectCreaseEnabled,
	usePrintPxCallback,
} from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";

type DividerCreaseLineProps = BoxProps & {
	offset?: number;
};

export function DividerCreaseLine({
	offset,
	...props
}: DividerCreaseLineProps) {
	const mm = usePrintPxCallback();
	const creaseEnabled = useAppSelector(selectCreaseEnabled);
	if (!offset || !creaseEnabled) {
		return null;
	}
	const height = mm(CREASE_LINE_WIDTH);
	const top = mm(offset - CREASE_LINE_WIDTH / 2);
	return (
		<NotExportable>
			<Box
				{...props}
				position="absolute"
				bgcolor="blue"
				left={0}
				right={0}
				height={height}
				top={top}
				displayPrint="none"
			/>
		</NotExportable>
	);
}

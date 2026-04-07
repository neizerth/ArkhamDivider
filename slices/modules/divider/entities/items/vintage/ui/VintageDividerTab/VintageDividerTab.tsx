import { Box, type BoxProps, type SxProps } from "@mui/material";
import { Icon } from "@/modules/core/icon/shared/ui";
import { useTabPosition } from "@/modules/divider/shared/lib";
import {
	selectShowCornerRadius,
	usePrintUnit,
} from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { useVintageDividerContext } from "../VintageDividerContext";
import * as S from "./VintageDividerTab.styles";

type VintageDividerTabProps = BoxProps;

export function VintageDividerTab({
	sx: sxProp,
	...props
}: VintageDividerTabProps) {
	const { sxOptions, tabIndex, divider } = useVintageDividerContext();

	const cornerRadiusEnabled = useAppSelector(selectShowCornerRadius);

	const getPrintSx = usePrintUnit(sxOptions);
	const sxStyles = getPrintSx(S.getSx);
	const circleSx = getPrintSx(S.getCircleSx);
	const shiftLeftSx = getPrintSx(S.getShiftSx, { position: "left" } as const);
	const shiftRightSx = getPrintSx(S.getShiftSx, { position: "right" } as const);
	const tabCornerRadiusSx = getPrintSx(S.getTabCornerRadiusSx);

	const { shiftLeft, shiftRight } = useTabPosition({
		dividerId: divider.id,
		tabIndex,
		tabsCount: 3,
	});

	const sx = {
		...sxStyles,
		...sxProp,
	} as SxProps;

	return (
		<Box {...props} sx={sx}>
			<Box sx={circleSx} />
			<NotExportable>
				{cornerRadiusEnabled && <Box sx={tabCornerRadiusSx} />}
				{divider.side === "front" && (
					<Box displayPrint="none">
						{tabIndex > 0 && (
							<Icon icon="action" sx={shiftLeftSx} onClick={shiftLeft} />
						)}
						{tabIndex < 2 && (
							<Icon icon="action" sx={shiftRightSx} onClick={shiftRight} />
						)}
					</Box>
				)}
			</NotExportable>
		</Box>
	);
}

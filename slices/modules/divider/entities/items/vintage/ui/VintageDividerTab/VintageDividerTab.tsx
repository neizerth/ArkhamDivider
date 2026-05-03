import { Box, type BoxProps, type SxProps } from "@mui/material";
import { Icon } from "@/modules/core/icon/shared/ui";
import { getDividerXPCost, useTabPosition } from "@/modules/divider/shared/lib";
import { selectShowCornerRadius, usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { getVintageDividerTabsCount } from "../../lib";
import { useVintageDividerContext } from "../VintageDividerContext";
import { VintageDividerRadialXP as RadialXP } from "../xp";
import * as S from "./VintageDividerTab.styles";

type VintageDividerTabProps = BoxProps;

export function VintageDividerTab({
	sx: sxProp,
	...props
}: VintageDividerTabProps) {
	const { sxOptions, tabIndex, divider, layout } = useVintageDividerContext();

	const cornerRadiusEnabled = useAppSelector(selectShowCornerRadius);

	const getPrintSx = usePrintSx(sxOptions);
	const sxStyles = getPrintSx(S.getSx);
	const circleSx = getPrintSx(S.getCircleSx);
	const shiftLeftSx = getPrintSx(S.getShiftSx, { position: "left" } as const);
	const shiftRightSx = getPrintSx(S.getShiftSx, { position: "right" } as const);
	const tabCornerRadiusSx = getPrintSx(S.getTabCornerRadiusSx);
	const radialXPSx = getPrintSx(S.getRadialXPSx);

	const tabsCount = getVintageDividerTabsCount(layout);

	const { shiftLeft, shiftRight, canShiftLeft, canShiftRight } = useTabPosition(
		{
			dividerId: divider.id,
			tabIndex,
			tabsCount,
		},
	);
	const xpCost = getDividerXPCost(divider);

	const sx = {
		...sxStyles,
		...sxProp,
	} as SxProps;

	return (
		<Box {...props} sx={sx}>
			<Box sx={circleSx} />
			{xpCost && <RadialXP xpCost={xpCost} sx={radialXPSx} />}
			<NotExportable>
				{divider.side === "front" && (
					<>
						{cornerRadiusEnabled && <Box sx={tabCornerRadiusSx} />}
						<Box displayPrint="none">
							{canShiftLeft && (
								<Icon icon="action" sx={shiftLeftSx} onClick={shiftLeft} />
							)}
							{canShiftRight && (
								<Icon icon="action" sx={shiftRightSx} onClick={shiftRight} />
							)}
						</Box>
					</>
				)}
			</NotExportable>
		</Box>
	);
}

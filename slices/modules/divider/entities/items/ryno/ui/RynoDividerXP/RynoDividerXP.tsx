import { Box, type BoxProps } from "@mui/material";
import type { SxProps } from "@mui/material/styles";
import { Icon } from "@/modules/core/icon/shared/ui";
import { getXPLevel } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { rynoDividerAssetsBaseUrl } from "../../config";
import { useRynoDividerContext } from "../RynoDividerContext";
import * as S from "./RynoDividerXP.styles";

type RynoDividerXPProps = BoxProps;

const xpSrc = `${rynoDividerAssetsBaseUrl}/xp.avif`;

export function RynoDividerXP(props: RynoDividerXPProps) {
	const { divider } = useRynoDividerContext();
	const getPrintSx = usePrintUnit();

	if (divider.type !== "player" || !divider.xpCost) {
		return null;
	}

	const { xpCost } = divider;
	const level = getXPLevel(xpCost) ?? 0;

	const label = xpCost.name;

	const containerSx = getPrintSx(S.getContainerSx);
	const imageSx = getPrintSx(S.getImageSx);
	const labelSx = getPrintSx(S.getLabelSx, {
		small: label.length > 2,
	});
	const levelsSx = getPrintSx(S.getLevelsSx);
	const maxLevelIconSx = getPrintSx(S.getLevelIconSx);

	const sx = {
		...containerSx,
		...props.sx,
	} as SxProps;

	return (
		<Box {...props} sx={sx}>
			<Box component="img" src={xpSrc} alt="" sx={imageSx} />

			<Box sx={labelSx}>{label}</Box>

			<Box sx={levelsSx}>
				{level > 0 && (
					<Box sx={maxLevelIconSx} color="#fff" zIndex={2}>
						<Icon icon={`ae_level_${level}`} scaleType={false} />
					</Box>
				)}
				<Box sx={maxLevelIconSx} color="#646464" zIndex={1}>
					<Icon icon={`ae_level_5`} scaleType={false} />
				</Box>
			</Box>
		</Box>
	);
}

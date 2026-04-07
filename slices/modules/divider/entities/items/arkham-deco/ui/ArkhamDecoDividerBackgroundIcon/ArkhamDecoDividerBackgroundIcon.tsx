import { Box, type BoxProps } from "@mui/material";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamDecoAssetUrl } from "../../config";
import { getArkhamDecoDefaultBackgroundIcon as getDefaultBackgroundIcon } from "../../lib";
import { useArkhamDecoDividerContext } from "../ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerBackgroundIcon.styles";

type ArkhamDecoDividerBackgroundIconProps = BoxProps;
export const ArkhamDecoDividerBackgroundIcon = ({
	...props
}: ArkhamDecoDividerBackgroundIconProps) => {
	const { divider, sxOptions } = useArkhamDecoDividerContext();
	const getPrintSx = usePrintUnit(sxOptions);

	const defaultIcon = getDefaultBackgroundIcon(divider);

	const getDividerIcon = useDividerIcon({ dividerId: divider.id, defaultIcon });

	const [icon, selectIcon] = getDividerIcon({
		param: "backgroundIcon",
	});

	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const sxProp = getPrintSx(S.getSx);
	const iconSx = getPrintSx(S.getIconSx);
	const iconContainerSx = getPrintSx(S.getIconContainerSx);
	const iconSelectionSx = getPrintSx(S.getIconSelectionSx);

	const sx = {
		...props.sx,
		...sxProp,
	};

	return (
		<>
			<Box {...props} sx={sx}>
				<Image src={`${arkhamDecoAssetUrl}/pattern.svg`} sx={backgroundSx} />
				<Box sx={iconContainerSx}>
					<DividerIcon dividerId={divider.id} icon={icon} sx={iconSx} visible />
				</Box>
			</Box>
			<Box sx={iconSelectionSx} onClick={selectIcon} />
		</>
	);
};

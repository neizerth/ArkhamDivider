import { Box, type BoxProps, type SxProps } from "@mui/material";
import { rgba256 } from "@/modules/core/color/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamStarterDividerBaseUrl as baseUrl } from "../../config";
import { get3mmDividerDefaultStripColor as getDefaultColor } from "../../lib/logic";
import { useArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";
import * as S from "./ArkhamStarterDividerStrip.styles";

const asset = prefix(baseUrl);

type ArkhamStarterDividerStripProps = BoxProps;

export function ArkhamStarterDividerStrip({
	sx: sxProp,
	...props
}: ArkhamStarterDividerStripProps) {
	const { divider } = useArkhamStarterDividerContext();

	const getPrintSx = usePrintUnit();
	const sxStyle = getPrintSx(S.getSx);
	const colorSxStyles = getPrintSx(S.getColorSx);

	const defaultColorObject = getDefaultColor(divider);
	const defaultColor = rgba256(defaultColorObject);

	const backgroundColor = divider.params?.stripColor ?? defaultColor;

	const colorSx = {
		...colorSxStyles,
		backgroundColor,
	} as SxProps;

	const sx = {
		...sxStyle,
		...sxProp,
	} as SxProps;

	return (
		<Box {...props} sx={sx}>
			<Box sx={colorSx} />
			<Image src={asset`/strip.avif`} width="100%" />
		</Box>
	);
}

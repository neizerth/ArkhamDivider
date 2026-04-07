import { Box, type BoxProps, type SxProps } from "@mui/material";
import { rgba256 } from "@/modules/core/color/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamStarterDividerBaseUrl } from "../../config";
import { get3mmDividerDefaultPlayerCornerColor as getDefaultColor } from "../../lib";
import { useArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";
import * as S from "./ArkhamStarterDividerPlayerCorner.styles";

// import { usePrintUnit } from "@/modules/print/shared/lib";

const asset = prefix(arkhamStarterDividerBaseUrl);

type ArkhamStarterDividerPlayerCornerProps = BoxProps;

export function ArkhamStarterDividerPlayerCorner(
	props: ArkhamStarterDividerPlayerCornerProps,
) {
	const { divider } = useArkhamStarterDividerContext();
	const getPrintSx = usePrintUnit();
	const colorSxStyle = getPrintSx(S.getColorSx);

	const defaultColorObject = getDefaultColor(divider);
	const defaultColor = rgba256(defaultColorObject);

	const backgroundColor = divider.params?.playerCornerColor ?? defaultColor;

	const colorSx = {
		...colorSxStyle,
		backgroundColor,
	} as SxProps;

	return (
		<Box {...props} overflow={"hidden"}>
			<Image src={asset`/player.avif`} width="100%" />
			<Box sx={colorSx} />
		</Box>
	);
}

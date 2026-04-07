import { Box, type BoxProps, type SxProps } from "@mui/material";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { absoluteFill } from "@/shared/config";
import { useArkhamDecoDividerContext } from "../../ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerOverlay.styles";

type ArkhamDecoDividerOverlayProps = BoxProps;

export function ArkhamDecoDividerOverlay(props: ArkhamDecoDividerOverlayProps) {
	const { divider } = useArkhamDecoDividerContext();
	const backgroundColor = divider.params?.overlayColor as string | undefined;
	const getPrintSx = usePrintUnit();
	const sxProp = getPrintSx(S.getSx);

	const sx = { ...props.sx, ...sxProp, backgroundColor } as SxProps;

	return <Box {...props} {...absoluteFill} sx={sx} />;
}

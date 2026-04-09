import { Box, type BoxProps } from "@mui/material";
import { usePrintPxCallback } from "@/modules/print/shared/lib";

// import { useArkhamIndexContext } from "../ArkhamIndexContext";

type ArkhamIndexDividerBorderProps = BoxProps;

export function ArkhamIndexDividerBorder(props: ArkhamIndexDividerBorderProps) {
	const _mm = usePrintPxCallback();

	// const { layout } = useArkhamIndexContext();
	return <Box {...props}>{/* SVG */}</Box>;
}

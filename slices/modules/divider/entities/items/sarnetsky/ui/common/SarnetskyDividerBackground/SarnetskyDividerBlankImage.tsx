import { Box, type BoxProps } from "@mui/material";
import { selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";

export function SarnetskyDividerBlankImage({ sx }: BoxProps) {
	const layout = useAppSelector(selectLayout);
	if (!layout) {
		return null;
	}
	const { orientation } = layout;
	const src = `/images/divider/background/sarnetsky/${orientation}/blank.png`;
	return <Box component="img" src={src} sx={sx} />;
}

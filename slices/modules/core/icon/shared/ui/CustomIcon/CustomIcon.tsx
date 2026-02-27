import { Box, type BoxProps, type SxProps } from "@mui/material";
import type { BaseIconProps } from "../../model";

type CustomIconProps = BoxProps & BaseIconProps;

export function CustomIcon({ icon, ...props }: CustomIconProps) {
	const sx = {
		...props.sx,
		objectFit: "contain",
		height: "1em",
	} as SxProps;

	return <Box {...props} component="img" src={icon} sx={sx} />;
}

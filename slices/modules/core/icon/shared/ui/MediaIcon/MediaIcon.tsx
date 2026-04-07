import { Box, type BoxProps, type SxProps } from "@mui/material";
import { useMediaUrl } from "@/modules/core/media/shared/lib";
import type { BaseIconProps } from "../../model";
import { FontIcon } from "../FontIcon";

type CustomIconProps = BoxProps &
	BaseIconProps & {
		mediaId: string;
		fallback?: string | null;
	};

export function MediaIcon({ mediaId, fallback, ...props }: CustomIconProps) {
	const sx = {
		...props.sx,
		objectFit: "contain",
		height: "1em",
	} as SxProps;

	const url = useMediaUrl(mediaId);

	if (!url) {
		return fallback && <FontIcon icon={fallback} {...props} />;
	}

	return <Box {...props} component="img" src={url} sx={sx} />;
}

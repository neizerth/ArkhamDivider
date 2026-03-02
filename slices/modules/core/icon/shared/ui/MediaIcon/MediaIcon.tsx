import { Box, type BoxProps, type SxProps } from "@mui/material";
import { useMediaUrl } from "@/modules/core/media/shared/lib";
import type { BaseIconProps } from "../../model";

type CustomIconProps = BoxProps &
	BaseIconProps & {
		mediaId: string;
	};

export function MediaIcon({ mediaId, ...props }: CustomIconProps) {
	const sx = {
		...props.sx,
		objectFit: "contain",
		height: "1em",
	} as SxProps;

	const url = useMediaUrl(mediaId);

	console.log("media icon url", {
		url,
		mediaId,
	});

	if (!url) {
		return null;
	}

	return <Box {...props} component="img" src={url} sx={sx} />;
}

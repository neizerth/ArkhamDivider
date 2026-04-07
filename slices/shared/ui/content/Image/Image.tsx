import { Box, type BoxProps } from "@mui/material";

type ImageProps = BoxProps<"img">;

export const Image = (props: ImageProps) => {
	return <Box component="img" {...props} />;
};

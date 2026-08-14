import { Box, type BoxProps } from "@mui/material";

type ImageProps = BoxProps<"img">;

export const Image = (props: ImageProps) => {
	// A print sheet mounts hundreds of these; synchronous decode would block the main
	// thread on every one. The export path stays correct because
	// `waitForDividerNodePaintReady` awaits `img.decode()` before capturing.
	//
	// Note: no `loading="lazy"` default — divider backgrounds must be decoded for
	// `modern-screenshot`, and an off-screen lazy image would capture blank.
	return <Box component="img" decoding="async" {...props} />;
};

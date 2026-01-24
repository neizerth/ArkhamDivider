import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";

type DividerContentProps = BoxProps;

export function DividerContent(props: DividerContentProps) {
	return <Box position="relative" zIndex={2} {...props} />;
}

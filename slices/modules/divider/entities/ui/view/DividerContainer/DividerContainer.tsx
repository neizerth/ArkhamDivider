import Box, { type BoxProps } from "@mui/material/Box";
import { fullSize } from "@/shared/config";

type DividerContainerProps = BoxProps;

export function DividerContainer(props: DividerContainerProps) {
	return <Box {...props} {...fullSize} position="relative" />;
}

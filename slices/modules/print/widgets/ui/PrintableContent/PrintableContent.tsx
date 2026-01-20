import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";

type PrintableContentProps = BoxProps;

export function PrintableContent(props: PrintableContentProps) {
	return <Box {...props}></Box>;
}

import type { StackProps } from "@mui/material/Stack";
import Stack from "@mui/material/Stack";

export type RowProps = StackProps;

export function Row(props: RowProps) {
	return <Stack {...props} flexDirection="row" />;
}

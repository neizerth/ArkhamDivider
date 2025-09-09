import type { StackProps } from "@mui/material/Stack";
import Stack from "@mui/material/Stack";

type RowProps = Omit<StackProps, "flexDirection">;

export function Row(props: RowProps) {
	return <Stack {...props} flexDirection="row" />;
}

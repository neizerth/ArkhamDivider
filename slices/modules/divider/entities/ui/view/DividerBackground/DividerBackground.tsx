import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { absoluteFill } from "@/shared/config";

type DividerBackgroundProps = Omit<BoxProps<"img">, "component">;

export function DividerBackground(props: DividerBackgroundProps) {
	const sxProps = props.sx ?? {};
	return (
		<Box
			{...props}
			component="img"
			sx={{
				zIndex: 1,
				...absoluteFill,
				...sxProps,
			}}
		/>
	);
}

import Box from "@mui/material/Box";
import type { PropsWithChildren } from "react";
import { fullSize } from "@/shared/config";

type DividerContainerProps = PropsWithChildren;

export function DividerContainer({ children }: DividerContainerProps) {
	return (
		<Box {...fullSize} position="relative">
			{children}
		</Box>
	);
}

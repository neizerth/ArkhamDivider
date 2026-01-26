import Box from "@mui/material/Box";
import type { PropsWithChildren } from "react";
import { selectPrintableLayoutSize } from "@/modules/divider/shared/lib";
import { selectBleedEnabled } from "@/modules/print/shared/lib";
import { fullSize } from "@/shared/config";
import { useAppSelector } from "@/shared/lib";

type DividerContainerProps = PropsWithChildren;

export function DividerContainer({ children }: DividerContainerProps) {
	const printableSize = useAppSelector(selectPrintableLayoutSize);
	const bleedEnabled = useAppSelector(selectBleedEnabled);

	if (!printableSize) {
		return null;
	}

	const { originalBleed, bleedArea } = printableSize;

	const wrapperProps = bleedEnabled
		? fullSize
		: {
				...printableSize.size,
				overflow: "hidden",
			};

	const contentProps = bleedEnabled
		? fullSize
		: {
				...bleedArea,
				top: -originalBleed,
				left: -originalBleed,
			};

	return (
		<Box {...fullSize} position="relative">
			<Box {...wrapperProps} position="relative">
				<Box {...contentProps} position="relative">
					{children}
				</Box>
			</Box>
		</Box>
	);
}

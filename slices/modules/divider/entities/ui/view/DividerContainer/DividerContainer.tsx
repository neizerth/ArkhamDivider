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

	const { originalBleed } = printableSize;

	const wrapperProps = bleedEnabled
		? fullSize
		: {
				...printableSize.size,
				overflow: "hidden",
			};

	const contentProps = bleedEnabled
		? fullSize
		: {
				top: -originalBleed,
				left: -originalBleed,
			};

	return (
		<Box {...fullSize} position="relative" className="divider-container">
			<Box
				{...wrapperProps}
				position="relative"
				className="divider-container-wrapper"
			>
				<Box
					{...contentProps}
					{...fullSize}
					position="relative"
					className="divider-container-content"
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}

import Stack, { type StackProps } from "@mui/material/Stack";
import { selectDividerPageLayouts } from "@/modules/divider/entities/lib";
import { DividerViewMemo as DividerView } from "@/modules/divider/entities/ui";
import { selectLayout } from "@/modules/divider/shared/lib";
import { PrintablePage } from "@/modules/print/features/ui";
import {
	selectDoubleSidePrintEnabled,
	selectOrientedPageFormat,
} from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";

type PrintableContentProps = StackProps;

export function PrintableContent(props: PrintableContentProps) {
	const doubleSided = useAppSelector(selectDoubleSidePrintEnabled);
	const pageLayouts = useAppSelector(selectDividerPageLayouts);
	const layout = useAppSelector(selectLayout);
	const pageFormat = useAppSelector(selectOrientedPageFormat);

	if (!pageFormat || !layout) {
		return null;
	}

	const sx = props.sx ?? {};

	return (
		<Stack
			{...props}
			sx={{
				alignItems: "center",
				justifyContent: "center",
				"@media screen": {
					gap: 2,
				},
				...sx,
			}}
		>
			{pageLayouts.map((pageLayout) => (
				<PrintablePage
					key={`${pageLayout.number}-${pageLayout.side}`}
					pageLayout={pageLayout}
					pageFormat={pageFormat}
					layout={layout}
					showSide={doubleSided}
					Component={DividerView}
				/>
			))}
		</Stack>
	);
}

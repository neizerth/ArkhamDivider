import Stack, { type StackProps } from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { selectDividerPageLayouts } from "@/modules/divider/entities/lib/store/selectors";
import { DividerView } from "@/modules/divider/entities/ui";
import { selectLayout } from "@/modules/divider/shared/lib";
import { PrintablePage } from "@/modules/print/features/ui";
import { selectOrientedPageFormat } from "@/modules/print/shared/lib";

type PrintableContentProps = StackProps;

export function PrintableContent(props: PrintableContentProps) {
	const pageLayouts = useSelector(selectDividerPageLayouts);
	const layout = useSelector(selectLayout);
	const pageFormat = useSelector(selectOrientedPageFormat);

	if (!pageFormat || !layout) {
		return null;
	}

	const sx = props.sx ?? {};

	return (
		<Stack
			{...props}
			sx={{
				...sx,
				gap: 2,
			}}
		>
			{pageLayouts.map((pageLayout) => (
				<PrintablePage
					key={pageLayout.id}
					pageLayout={pageLayout}
					pageFormat={pageFormat}
					layout={layout}
					Component={DividerView}
				/>
			))}
		</Stack>
	);
}

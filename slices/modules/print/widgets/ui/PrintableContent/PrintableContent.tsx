import Stack, { type StackProps } from "@mui/material/Stack";
import { selectDividerPageLayouts } from "@/modules/divider/entities/lib";
import { DividerViewMemo as DividerView } from "@/modules/divider/entities/ui";
import { PrintablePage } from "@/modules/print/features/ui";
import {
	selectDoubleSidePrintEnabled,
	selectOrientedPageFormat,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";

type PrintableContentProps = StackProps;

export function PrintableContent(props: PrintableContentProps) {
	const doubleSided = useAppSelector(selectDoubleSidePrintEnabled);
	const pageLayouts = useAppSelector(selectDividerPageLayouts);
	const pageFormat = useAppSelector(selectOrientedPageFormat);
	const singleItemPerPage = useAppSelector(selectSingleItemPerPage);

	if (!pageFormat) {
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
					showSide={doubleSided}
					Component={DividerView}
					singleItemPerPage={singleItemPerPage}
				/>
			))}
		</Stack>
	);
}

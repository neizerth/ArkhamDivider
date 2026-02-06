import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import {
	selectDividerPageLayouts,
	selectLayoutBleed,
} from "@/modules/divider/entities/lib";
import { DividerViewMemo as DividerView } from "@/modules/divider/entities/ui";
import { PrintablePage } from "@/modules/print/features/ui";
import {
	selectBleedEnabled,
	selectCropMarksEnabled,
	selectDoubleSidePrintEnabled,
	selectOrientedPageFormat,
	selectPreviewZoom,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";

type PrintableContentProps = StackProps;

export function PrintableContent(props: PrintableContentProps) {
	const doubleSided = useAppSelector(selectDoubleSidePrintEnabled);
	const pageLayouts = useAppSelector(selectDividerPageLayouts);
	const pageFormat = useAppSelector(selectOrientedPageFormat);
	const singleItemPerPage = useAppSelector(selectSingleItemPerPage);
	const previewZoom = useAppSelector(selectPreviewZoom);
	const cropmarksEnabled = useAppSelector(selectCropMarksEnabled);
	const bleed = useAppSelector(selectLayoutBleed);
	const bleedEnabled = useAppSelector(selectBleedEnabled);

	if (!pageFormat) {
		return null;
	}

	const sx = props.sx ?? {};

	const pageProps = {
		pageFormat,
		showSide: doubleSided,
		Component: DividerView,
		singleItemPerPage,
		previewZoom,
		hideCropmarks: !cropmarksEnabled,
		bleed,
		bleedEnabled,
	};

	const zoom = previewZoom ? previewZoom : 100;

	return (
		<Box overflow="auto">
			<Box width={`${zoom}%`} marginInline="auto">
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
							{...pageProps}
							key={`${pageLayout.number}-${pageLayout.side}`}
							pageLayout={pageLayout}
						/>
					))}
				</Stack>
			</Box>
		</Box>
	);
}

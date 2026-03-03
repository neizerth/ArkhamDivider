import { GlobalStyles } from "@mui/material";
import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import {
	selectDividerPageLayouts,
	selectLayoutBleed,
} from "@/modules/divider/entities/lib";
import { DividerViewMemo as DividerView } from "@/modules/divider/entities/ui";
import { PagePreviewZoomSelect } from "@/modules/print/entities/ui";
import { PrintablePage } from "@/modules/print/features/ui";
import {
	getPageSize,
	selectBleedEnabled,
	selectCropMarksEnabled,
	selectDoubleSidePrintEnabled,
	selectEnablePageCounter,
	selectOrientedPageFormat,
	selectPageLayoutGrid,
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
	const pageLayoutGrid = useAppSelector(selectPageLayoutGrid);
	const enablePageCounter = useAppSelector(selectEnablePageCounter);

	if (!pageFormat || !pageLayoutGrid || pageLayouts.length === 0) {
		return null;
	}

	const sx = props.sx ?? {};

	const pageSize = getPageSize({
		units: "mm",
		pageFormat,
		unitSize: pageLayoutGrid.unitSize,
		singleItemPerPage,
		cropmarksEnabled,
	});

	const pageProps = {
		pageFormat,
		showSide: doubleSided,
		Component: DividerView,
		singleItemPerPage,
		previewZoom,
		cropmarksEnabled,
		bleed,
		bleedEnabled,
		pageSize,
		enablePageCounter,
	};

	const zoom = previewZoom ? previewZoom : 100;

	return (
		<Stack
			sx={{
				"@media screen": {
					gap: 4,
				},
			}}
		>
			<Stack justifyContent="center" alignItems="center" displayPrint="none">
				<PagePreviewZoomSelect />
			</Stack>
			<GlobalStyles
				styles={{
					"@media print": {
						"@page": {
							size: `${pageSize.width}mm ${pageSize.height}mm`,
						},
					},
				}}
			/>
			<Box
				overflow="auto"
				sx={{
					"@media screen": {
						padding: 2,
					},
				}}
			>
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
		</Stack>
	);
}

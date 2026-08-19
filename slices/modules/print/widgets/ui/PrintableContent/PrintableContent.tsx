import { GlobalStyles } from "@mui/material";
import Box from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import { useMemo } from "react";
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
	selectPageMargin,
	selectPreviewZoom,
	selectSingleItemPerPage,
} from "@/modules/print/shared/lib";
import { selectStory } from "@/modules/story/shared/lib";
import { StoryNotSupported } from "@/modules/story/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { Debounce } from "@/shared/ui";

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
	const pageMargin = useAppSelector(selectPageMargin);
	const story = useAppSelector(selectStory);

	// Memoized above the early returns (hooks cannot be called conditionally). This component
	// subscribes to a dozen selectors, and a fresh `pageSize`/`pageProps` object on every one
	// of those updates defeats `memo` on `PrintablePage` and, through it, on `DividerView`.
	const pageSize = useMemo(
		() =>
			pageFormat && pageLayoutGrid
				? getPageSize({
						units: "mm",
						pageFormat,
						unitSize: pageLayoutGrid.unitSize,
						singleItemPerPage,
						cropmarksEnabled,
					})
				: null,
		[pageFormat, pageLayoutGrid, singleItemPerPage, cropmarksEnabled],
	);

	const pageProps = useMemo(
		() =>
			pageFormat && pageSize
				? {
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
						pageMargin,
					}
				: null,
		[
			pageFormat,
			pageSize,
			doubleSided,
			singleItemPerPage,
			previewZoom,
			cropmarksEnabled,
			bleed,
			bleedEnabled,
			enablePageCounter,
			pageMargin,
		],
	);

	if (!pageFormat || !pageLayoutGrid || pageLayouts.length === 0) {
		return null;
	}

	if (story?.supported === false) {
		return <StoryNotSupported />;
	}

	if (!pageSize || !pageProps) {
		return null;
	}

	const sx = props.sx ?? {};

	const zoom = previewZoom ? previewZoom : 100;

	const marginId = JSON.stringify(pageMargin);

	/**
	 * Changing this remounts the whole print run, so it must only list things that actually
	 * change what is rendered.
	 *
	 * `previewZoom` is deliberately absent: zoom is applied as a CSS width on the wrapper
	 * below, so the browser can reflow in place. Including it cost a full unmount/remount of
	 * every page on every zoom step — measured at ~2 s for a 63-divider run. `DividerView`
	 * subscribes to the zoom itself and rescales from its own `ResizeObserver`.
	 */
	const debounceValue = `${pageLayouts.length}-${pageFormat.type}-${singleItemPerPage}-${marginId}`;

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
			<Debounce key={debounceValue} delay={200}>
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
					<Box
						marginInline="auto"
						sx={{
							width: `${zoom}%`,
							"@media print": {
								width: "100%",
							},
						}}
					>
						<Stack
							{...props}
							sx={{
								alignItems: "center",
								justifyContent: "center",
								"@media screen": {
									gap: 2,
								},
								/**
								 * Centering the print run vertically can add a fractional offset before
								 * the first sheet, which then accumulates down the run. Pagination
								 * comes from the per-page break, so the print flow starts at the top.
								 */
								"@media print": {
									justifyContent: "flex-start",
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
			</Debounce>
		</Stack>
	);
}

import Stack from "@mui/material/Stack";
import { pick, range } from "ramda";
import { creditsParams } from "@/modules/print/shared/config";
import {
	getGridCropmarks,
	getMinPageMarginTop,
	getPageCreditsAreaSize,
	hasPageCreditsFreeSpace,
	usePrintUnitByRect,
} from "@/modules/print/shared/lib";
import type { PageFormat, PageLayout } from "@/modules/print/shared/model";
import { CropmarksView, Page } from "@/modules/print/shared/ui";
import type { BoxPosition, BoxSize, WithId } from "@/shared/model";
import { Row } from "@/shared/ui";
import { getRelativeBoxSize } from "@/shared/util";
import { PageCredits } from "../PageCredits";

type PrintablePageProps<Props extends WithId> = {
	pageLayout: PageLayout<Props>;
	pageFormat: PageFormat;
	showSide?: boolean;
	singleItemPerPage?: boolean;
	cropmarksEnabled?: boolean;
	enablePageCounter?: boolean;
	bleed: number;
	bleedEnabled: boolean;
	pageSize: BoxSize;
	Component: React.ComponentType<Props>;
	pageMargin: BoxPosition;
};

export function PrintablePage<T extends WithId>({
	pageLayout,
	Component,
	showSide = false,
	singleItemPerPage = false,
	cropmarksEnabled,
	bleedEnabled = false,
	enablePageCounter = true,
	bleed,
	pageSize,
	pageMargin,
}: PrintablePageProps<T>) {
	const { items, grid } = pageLayout;

	const { width } = pageSize;
	const { ref, mm, mmSize } = usePrintUnitByRect({ width });

	const rows = range(0, grid.rows);
	const cols = range(0, grid.cols);

	const containerSize = getRelativeBoxSize(pageSize, grid.size);
	const usedAreaSize = getPageCreditsAreaSize(pageLayout);

	const showCredits = hasPageCreditsFreeSpace({ pageLayout, pageSize });

	const unitAspectRatio = grid.unitSize.width / grid.unitSize.height;

	const aspectRatio = grid.size.width / grid.size.height;
	const pageOptions = pick(["side", "number", "total"], pageLayout);

	const contentSx = {
		aspectRatio,
		width: `${containerSize.width}%`,
		"@media print": {
			width: `${grid.size.width}mm`,
		},
	};

	const pageCreditsSx = {
		position: "absolute",
		bottom: mm(creditsParams.blockPadding),
		left: mm(creditsParams.blockPadding),
		right: mm(creditsParams.blockPadding),
		maxHeight: mm(creditsParams.contentSize - creditsParams.blockPadding),
		"@media print": {
			bottom: `${creditsParams.blockPadding}mm`,
			left: `${creditsParams.blockPadding}mm`,
			right: `${creditsParams.blockPadding}mm`,
			maxHeight: `${creditsParams.contentSize - creditsParams.blockPadding}mm`,
		},
	};

	const justifyContent = pageLayout.isLast ? "flex-start" : "center";

	const hideCounter =
		(singleItemPerPage && !cropmarksEnabled) || !enablePageCounter;

	const minMarginTop = getMinPageMarginTop({
		pageSize,
		areaSize: usedAreaSize,
		isLast: pageLayout.isLast,
	});

	const paddingTop = Math.max(minMarginTop, pageMargin.top);

	return (
		<Page
			{...pageOptions}
			{...pageSize}
			hideCounter={hideCounter}
			mmSize={mmSize}
			ref={ref}
			showSide={showSide}
			justifyContent={justifyContent}
			paddingTop={mm(paddingTop)}
			paddingBottom={mm(pageMargin.bottom)}
			paddingLeft={mm(pageMargin.left)}
			paddingRight={mm(pageMargin.right)}
		>
			<Stack sx={contentSx}>
				{rows.map((rowIndex) => (
					<Row key={rowIndex}>
						{cols.map((colIndex) => {
							const row = items[rowIndex];
							const item = row?.items[colIndex];

							const cropmarks = getGridCropmarks({
								grid,
								rowIndex,
								colIndex,
								bleedEnabled: bleedEnabled,
								hidden: !cropmarksEnabled,
							});

							return (
								<Row
									key={colIndex}
									sx={{
										aspectRatio: unitAspectRatio,
										width: "100%",
									}}
								>
									<CropmarksView
										mmSize={mmSize}
										cropmarks={cropmarks}
										bleed={bleed}
										bleedEnabled={bleedEnabled}
										unitSize={grid.unitSize}
									>
										{item && <Component {...item} />}
									</CropmarksView>
								</Row>
							);
						})}
					</Row>
				))}
			</Stack>
			{pageLayout.isLast && showCredits && (
				<PageCredits mmSize={mmSize} sx={pageCreditsSx} />
			)}
		</Page>
	);
}

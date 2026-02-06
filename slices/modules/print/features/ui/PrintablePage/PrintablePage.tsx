import Stack from "@mui/material/Stack";
import { pick, range } from "ramda";
import { PAGE_CREDITS_SIZE } from "@/modules/print/shared/config";
import {
	canShowPageCredits,
	getGridCropmarks,
	getPageSizeMm,
	usePrintUnitByRect,
} from "@/modules/print/shared/lib";
import type { PageFormat, PageLayout } from "@/modules/print/shared/model";
import { CropmarksView, Page } from "@/modules/print/shared/ui";
import type { WithId } from "@/shared/model";
import { Row } from "@/shared/ui";
import { getRelativeBoxSize } from "@/shared/util";
import { PageCredits } from "../PageCredits";

type PrintablePageProps<Props extends WithId> = {
	pageLayout: PageLayout<Props>;
	pageFormat: PageFormat;
	showSide?: boolean;
	singleItemPerPage?: boolean;
	hideCropmarks?: boolean;
	bleed: number;
	Component: React.ComponentType<Props>;
};

export function PrintablePage<T extends WithId>({
	pageLayout,
	pageFormat,
	Component,
	showSide = false,
	singleItemPerPage = false,
	hideCropmarks = false,
	bleed,
}: PrintablePageProps<T>) {
	const { items, grid } = pageLayout;
	const pageSize = getPageSizeMm({
		pageFormat,
		unitSize: grid.unitSize,
		singleItemPerPage,
	});
	const { width } = pageSize;
	const { ref, mm, mmSize } = usePrintUnitByRect({ width });

	const rows = range(0, grid.rows);
	const cols = range(0, grid.cols);

	const containerSize = getRelativeBoxSize(pageSize, grid.size);

	const showCredits = canShowPageCredits({
		pageSize,
		areaSize: grid.unitSize,
		isLast: pageLayout.isLast,
	});

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
		bottom: mm(5),
		left: mm(5),
		right: mm(5),
		maxHeight: mm(PAGE_CREDITS_SIZE - 5),
	};

	const justifyContent = pageLayout.isLast ? "flex-start" : "center";

	return (
		<Page
			{...pageOptions}
			{...pageSize}
			hideCounter={singleItemPerPage}
			mmSize={mmSize}
			ref={ref}
			showSide={showSide}
			justifyContent={justifyContent}
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
								withBleed: bleed > 0,
								hidden: hideCropmarks,
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
